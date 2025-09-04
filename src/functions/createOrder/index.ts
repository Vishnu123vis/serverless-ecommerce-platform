import { APIGatewayProxyEvent } from "aws-lambda";
import { httpResponse } from "@libs/APIResponses";
import Dynamodb from "@libs/Dynamodb";
import { OrderRecord } from '@libs/types/dyno'
import { v4 as uuid } from 'uuid';


export const handler = async (event: APIGatewayProxyEvent) => {
  try {
   const ordersTable = process.env.ordersTable;

   const order = JSON.parse(event.body)
   const userId = event.requestContext?.authorizer?.claims?.sub;
   const userEmail = event.requestContext?.authorizer?.claims?.email;

   const timestamp = Date.now();

   //order details must be in the OrderRecord type (in dyno.ts)
   const orderDetails: OrderRecord = {
    id: uuid(),
    pk: userId,
    sk: `order#${timestamp}`,

    userId,
    userEmail,
    dateCreated: timestamp,
    status: 'placed',
    items: order.items,
   }

   await Dynamodb.write({
    data: orderDetails,
    tableName: ordersTable,
   })

   return httpResponse({ body: { orderId: orderDetails.id } })
  } catch (error: any) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};
