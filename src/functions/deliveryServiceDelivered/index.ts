import { APIGatewayProxyEvent } from 'aws-lambda'
import { httpResponse } from '../../libs/APIResponses'
import Dynamodb from '../../libs/Dynamodb'
import Authorisation from '../../libs/Authorisation'
import { OrderRecord } from '@libs/types/dyno'

export const handler = async (event: APIGatewayProxyEvent) => {
    try{

        await Authorisation.apiKeyAuth(event)
    
    }catch(error){
        console.log(error)
        return httpResponse({
            statusCode: 401,
            body: {
                message: "API Key Auth has failed"
            }
        })
    }

    try{

        const ordersTableName = process.env.ordersTable
        const orderId = event.pathParameters.orderId
       
        const order = await Dynamodb.get<OrderRecord>({
            pkValue: orderId,
            tableName: ordersTableName
        })


        if (!order || !order.id){
            return httpResponse({statusCode: 404, body: {} })
        }

        const modifiedOrder = {
            ...order,
            status: "delivered",
            dateUpdated: new Date().toISOString()
        }

        await Dynamodb.write({
            data: modifiedOrder,
            tableName: ordersTableName
        })

        return httpResponse({
            body: {
                message: "Order Delivered"
            }
        })

    }catch(error){
        return httpResponse({
            statusCode: 500,
            body: error.message
        })
    }
}