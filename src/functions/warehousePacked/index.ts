import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import DynamoDB from '@libs/Dynamodb';
import { OrderRecord } from '@libs/types/dyno';
import Authorisation from '@libs/Authorisation';

export const handler = async (event: APIGatewayProxyEvent) => {
    try{
        
        await Authorisation.apiKeyAuth(event)

    } catch(error){
        console.log(error)
        return httpResponse({
            statusCode: 401,
            body:{
                message: 'Unauthorized (API Key Auth Failed)'
            }
        })
    }

    try{
        const ordersTableName = process.env.ordersTable
        const orderID = event.pathParameters?.orderId
        const order = await DynamoDB.get<OrderRecord>({
            pkValue: orderID,
            tableName: ordersTableName,
        })

        if (!order || !order.id) {
            return httpResponse({
                statusCode: 404,
                body: {
                    message: 'Order not found'
                }
            })
        }

        const updatedOrder: OrderRecord = {
            ...order,
            status: 'packed',
            dateUpdated: Date.now(),
        }

        await DynamoDB.write({
            data: updatedOrder,
            tableName: ordersTableName,
        })

        return httpResponse({ body: {message: 'Order has been marked as packed'}})
    } catch(error){
        return httpResponse({
            statusCode: 500,
            body: {
                message: 'Error marking order as packed',
                error: error.message
            }
        })
    }
}
