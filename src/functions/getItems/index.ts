import { APIGatewayProxyEvent } from "aws-lambda";
import { httpResponse } from "@libs/APIResponses";
import Dynamodb from "@libs/Dynamodb";
import { ItemsRecord } from '@libs/types/dyno'


export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { category, type, brand } = event.queryStringParameters || {};
    const itemsTable = process.env.itemsTable;

    console.log('Query Parameters:', { category, type, brand, itemsTable });

    if (!category) {
      return httpResponse({
        statusCode: 400,
        body: { message: 'No "Category" query was provided' },
      });
    }

    let sk = undefined;
    if (type) {
      sk = type;
      if (brand) {
        sk = `${type}#${brand}`;
      }
    }

    const itemsResp = await Dynamodb.query<ItemsRecord>({
      tableName: itemsTable!,
      Index: 'index1',
      pkValue: category,
      skKey: sk ? 'sk' : undefined,
      skBeginsWith: sk,
    });

    console.log('DynamoDB Response:', JSON.stringify(itemsResp, null, 2));

    const itemsArray = Array.isArray(itemsResp) ? itemsResp : [itemsResp];
    const itemData = itemsArray.map(({ pk, sk, ...others }) => others);

    return httpResponse({ body: itemData });

  } catch (error: any) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};
