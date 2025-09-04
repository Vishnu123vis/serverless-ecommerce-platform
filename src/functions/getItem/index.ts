import { APIGatewayProxyEvent } from "aws-lambda";
import { httpResponse } from "@libs/APIResponses";
import Dynamodb from "@libs/Dynamodb";
import { ItemsRecord } from '@libs/types/dyno'


export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const itemId = event.pathParameters.itemId;
    const itemsTable = process.env.itemsTable;


    const itemData = await Dynamodb.get<ItemsRecord>({
        pkValue: itemId,
        tableName: itemsTable,
    })

    const { pk, sk, ...others } = itemData

    return httpResponse({ body: others })

  } catch (error: any) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};
