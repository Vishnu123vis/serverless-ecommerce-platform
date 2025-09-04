import { EventBridgeEvent } from 'aws-lambda'
import Dynamodb from '../../libs/Dynamodb'
import { OrderRecord, ItemsRecord } from '@libs/types/dyno'
import SES from '../../libs/SES'

export const handler = async (event: EventBridgeEvent<string, OrderRecord>) => {

    try{

        const itemsTable = process.env.itemsTable

        const details = event.detail

        const itemPromises = details.items.map(async (item) => {

            const itemData = await Dynamodb.get<ItemsRecord>({
                tableName: itemsTable,
                pkValue: item.id,
            })

            return{
                count: item.count,
                title: itemData.title,
                color: itemData.colorPrefrence?.find((color) => color.colorCode === Number(item.color))?.displayValue
            }

        })

        const itemDetails = await Promise.all(itemPromises)

        await SES.sendEmailNotification({
            email: details.userEmail,
            subject: "Order Delivered",
            text: `Your order has been delivered successfully.

            ${itemDetails.map(itemRecap)}

            We hope you enjoy your new items!`
        })
       
    
    }catch(error){

        console.error(error)

    }
}

const itemRecap = (item: {count: number, title: string, color: string}) => {
    return `
    ${item.count}x ${item.title} ${item.color ? `in ${item.color}` : ''}
    `
}

