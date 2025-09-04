import { APIGatewayProxyEvent } from "aws-lambda";
import { httpResponse } from "@libs/APIResponses";
import Dynamodb from "@libs/Dynamodb";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
   const userId = event.requestContext?.authorizer?.claims?.sub;
   const ordersTable = process.env.ordersTable;

   const ordersResponese = await Dynamodb.query({
        tableName: ordersTable,
        Index: 'index1',
        pkValue: userId,
        limit: 10
   })

   const itemData = ordersResponese.map(({ pk, sk, ...others }) => others)

   return httpResponse({ body: itemData })


  } catch (error: any) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};
