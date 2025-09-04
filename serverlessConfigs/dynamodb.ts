import type { AWS } from '@serverless/typescript';

const DynamodbResources: AWS['resources']['Resources'] = {
  itemsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:custom.itemsTable}',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'pk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sk',
          AttributeType: 'S',
        }
      ],

      KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      GlobalSecondaryIndexes: [
        {
            IndexName: 'index1',
            KeySchema: [
                {
                    AttributeName: 'pk',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'sk',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: "ALL",
            }
        }
      ]
    }
  },


  ordersTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:custom.ordersTable}',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'pk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sk',
          AttributeType: 'S',
        }
      ],

      KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        },
      ],
      StreamSpecification: {
        StreamViewType: "NEW_IMAGE",
      },
      BillingMode: "PAY_PER_REQUEST",
      GlobalSecondaryIndexes: [
        {
            IndexName: 'index1',
            KeySchema: [
                {
                    AttributeName: 'pk',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'sk',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: "ALL",
            }
        }
      ]
    }
  }

};

export default DynamodbResources;
