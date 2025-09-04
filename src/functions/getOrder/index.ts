import { APIGatewayProxyEvent } from "aws-lambda";
import { httpResponse } from "@libs/APIResponses";
import Dynamodb from "@libs/Dynamodb";
import { OrderRecord } from '@libs/types/dyno';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const ordersTable = process.env.ordersTable;
    const orderId = event.pathParameters.orderId

    const orderData = await Dynamodb.get<OrderRecord>({
        pkValue: orderId || '',
        tableName: ordersTable,
    })

    return httpResponse({ body: orderData })

   
  } catch (error: any) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};
