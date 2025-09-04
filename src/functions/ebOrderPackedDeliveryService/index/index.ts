import { EventBridgeEvent } from "aws-lambda";
import Dynamodb from "@libs/Dynamodb";
import {OrderRecord} from '@libs/types/dyno'
import Secrets from '@libs/Secrets'
import axios from 'axios'


export const handler = async (event: EventBridgeEvent<string, OrderRecord>) => {
    try {
        const details = event.detail

        const authKey = await Secrets.getSecret(
            `${process.env.APP_PREFIX}deliveryApiKey`    
        )

        const deliveryData = await getDeliveryInfo(details)

        await axios.post("https://dummyjson.com/products/add", deliveryData, {
            headers: {
                authorizaton: authKey
            }
        })

        
    }catch(error){
        console.log("delivery service error")
    }
}

const getDeliveryInfo = async (details: OrderRecord) => {
    const { userId } = details;

    const userAddress = await Dynamodb.get({
        pkValue: userId,
        tableName: process.env.userAddress
    })

    const warehouseAddress = "03 Road, California, CA 18023"

    return {
        deliveryAddress: userAddress,
        pickupAddress: warehouseAddress,
        userId,
    }
}
