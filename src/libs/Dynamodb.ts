import { AttributeValue, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommandInput, QueryCommand, GetCommand, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

const ddClient = new DynamoDBClient();

type Item = Record<string, AttributeValue>;

const DynamoDB = {
  query: async <T = Item>({
    tableName,
    Index,
    pkKey = "pk",
    pkValue,
    skKey,
    skValue,
    skBeginsWith,
    limit,
  }: {
    tableName: string;
    Index?: string;
    pkKey?: string;
    pkValue: string;
    skKey?: string;
    skValue?: string;
    skBeginsWith?: string;
    limit?: number;
  }) => {
    if (skKey && !(skValue || skBeginsWith)) {
      throw Error("skBegins with or skValue is not provided along with skKey");
    }

    let params: QueryCommandInput = {
      TableName: tableName,
      IndexName: Index,
      KeyConditionExpression: `${pkKey} = :pkValue${skKey ? ` AND ${skKey} = :skValue` : ""}`,
      ExpressionAttributeValues: {
        ":pkValue": pkValue,
        ...(skValue && skKey ? { ":skValue": skValue } : {}),
      },
      Limit: limit,
    };

    if (!skKey) {
      const command = new QueryCommand(params);
      const response = await ddClient.send(command);
      return response.Items as T[];
    } else {
      if (skValue) {
        if (params.ExpressionAttributeValues) {
          params.ExpressionAttributeValues[":skValue"] = skValue;
        }
      }

      const command = new QueryCommand(params);
      const response = await ddClient.send(command);
      return response.Items as T[];
    }
  },

  get: async <T = Item>({
    pkKey = "id",
    pkValue,
    skKey,
    skValue,
    tableName,
  }: {
    pkKey?: string;
    pkValue: string;
    skKey?: string;
    skValue?: string;
    tableName: string;
  }) => {
    const params: {
      TableName: string;
      Key: { [key: string]: any };
    } = {
      TableName: tableName,
      Key: {
        [pkKey]: pkValue,
      },
    };

    if (skKey && skValue) {
      params.Key[skKey] = skValue;
    }

    const response = await ddClient.send(new GetCommand(params));
    return response.Item as T;
  },

  write: async <T = Item>({
    data,
    tableName,
  }: {
    data: {[key: string]: any};
    tableName: string;
  }) => {
    const params: PutCommandInput = {
      TableName: tableName,
      Item: {...data},
    }
    await ddClient.send(new PutCommand(params));
    return params.Item as T
  }
};

export default DynamoDB;
