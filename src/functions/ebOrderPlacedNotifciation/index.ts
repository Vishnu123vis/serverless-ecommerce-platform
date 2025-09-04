import { EventBridgeEvent } from 'aws-lambda';
import Dynamodb from '@libs/Dynamodb'
import {OrderRecord, ItemsRecord} from '@libs/types/dyno'
import SES from '@libs/SES'

export const handler = async (event: EventBridgeEvent<string, OrderRecord>) => {
    try {

        const itemsTable = process.env.itemsTable
        const details = event.detail

        const itemPromises = details.items.map(async (item) => {
            const itemData = await Dynamodb.get<ItemsRecord>({
                tableName: itemsTable,
                pkValue: item.id,
            })

            return {
                count: item.count,
                title: itemData.title,
                color: itemData.colorPrefrence?.find((colorObj) => colorObj.colorCode === Number(item.color))?.displayValue,
            }
        })
        const itemDetails = await Promise.all(itemPromises)

        await SES.sendEmailNotification({
            email: details.userEmail,
            subject: 'Order Placed',
            text: `Your order has been placed for:
            
            ${itemDetails.map(itemRecap)}.

            Thank you for placing your order with us. The warehouse is currently preparing your order.

            We will notify you as soon as your order has been shipped to you.
            `,
        })
        console.log('Email sent successfully')
        return


    } catch (error) {
        console.error(error)
    }
}

const itemRecap = ({count, title, color}: {
    count: number,
    title: string,
    color?: string
}) => {
    return `${count}x ${title} ${color ? `of ${color} color :` : ''}`
    
}