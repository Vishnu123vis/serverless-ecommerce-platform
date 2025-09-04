import type { AWS } from '@serverless/typescript';
import functions from './serverlessConfigs/functions'
import DynamodbResources from './serverlessConfigs/dynamodb'
import CognitoConfig from './serverlessConfigs/cognitoConfig'
import SecretsConfig from './serverlessConfigs/secrets'
const serverlessConfiguration: AWS = {
  service: 'ecommerce-app',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: "us-east-2",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      APP_PREFIX: "${self:service}-${sls:stage}-",
      itemsTable: "${self:custom.itemsTable}",
      ordersTable: "${self:custom.ordersTable}",
      eventBridgeBusName: "${self:custom.eventBridgeBusName}",
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: [
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.itemsTable}',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.itemsTable}/index/index1',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.ordersTable}',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.ordersTable}/index/index1',


        ]
      }
    ]
  },

  functions,

  resources: {
    Resources: {
      ...DynamodbResources,
      ...CognitoConfig,
      ...SecretsConfig,
    },
    Outputs: {
      region: {
        Value: "${self:provider.region}"
      },
      ItemDynoTableName: {
        Value: "${self:custom.itemsTable}",
        Export: {
          Name: "${self:provider.environment.APP_PREFIX}ItemDynoTableName"
        }
      },
      OrderDynoTableName: {
        Value: "${self:custom.ordersTable}",
        Export: {
          Name: "${self:provider.environment.APP_PREFIX}OrderDynoTableName"
        }
      }
    }
  },

  package: { individually: true },

  custom: {
    itemsTable: "${self:provider.environment.APP_PREFIX}item-table",
    ordersTable: "${self:provider.environment.APP_PREFIX}order-table",
    eventBridgeBusName: "${self:provider.environment.APP_PREFIX}ordersTableEventBus",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
