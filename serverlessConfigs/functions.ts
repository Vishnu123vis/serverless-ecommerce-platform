import type { AWS } from '@serverless/typescript';

const corsSettings = {
    origin: '*',
    headers: [
        'Authorization',
        'Content-Type',
        'X-Amz-Date',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent',
        'X-Api-Key',
    ],
    allowCredentials: false,
}

interface Authorizer {
    name: string;
    type: string;
    arn: {
        'Fn::GetAtt': string[]
    }
}

const authorizer: Authorizer = {
    name: 'authorizer',
    type: 'COGNITO_USER_POOLS',
    arn: {
        'Fn::GetAtt': ['CognitoUserPool', 'Arn']
    }
}

const iamGetSecret = {
    Effect: 'Allow',
    Action: ['secretsmanager:GetSecretValue'],
    Resource: '*'
}

const functions:AWS['functions']= {
    getItems: {
        handler: 'src/functions/getItems/index.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: 'items',
                    cors: corsSettings
                }
            }
        ]
    },
    getItem: {
        handler: 'src/functions/getItem/index.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: 'items/{itemId}',
                    cors: corsSettings
                }
            }
        ]
    },
    signUpUser: {
        handler: 'src/functions/signUpUser/index.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'signup',
                    cors: corsSettings
                }
            }
        ],
        //@ts-expect-error
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 'cognito-idp:*',
                Resource: '*'
            },
        ],
    },
    signInUser: {
        handler: 'src/functions/signInUser/index.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'signin',
                    cors: corsSettings
                }
            }
        ],
        //@ts-expect-error
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 'cognito-idp:*',
                Resource: '*'
            },
        ],
    },
    createOrder: {
        handler: 'src/functions/createOrder/index.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'orders',
                    cors: corsSettings,
                    authorizer: authorizer
                }
            }
        ]
    },
    getOrder: {
        handler: 'src/functions/getOrder/index.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: 'order/{orderId}',
                    cors: corsSettings,
                    authorizer: authorizer
                }
            }
        ]
    },

    getOrders: {
        handler: 'src/functions/getOrders/index.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: 'orderslist',
                    cors: corsSettings,
                    authorizer: authorizer
                }
            }
        ]
    },
    streamManager: {
        handler: 'src/functions/streamManager/index.handler',
        events: [
          {
            stream: {
              type: 'dynamodb',
              arn: {
                'Fn::GetAtt': ['ordersTable', 'StreamArn']
              },
              batchSize: 1,
              startingPosition: 'LATEST'
            }
          }
        ],
        //@ts-expect-error
        iamRoleStatements: [
          {
            Effect: 'Allow',
            Action: ['events:PutEvents'],
            Resource: 'arn:aws:events:${self:provider.region}:${aws:accountId}:event-bus/${self:provider.environment.eventBridgeBusName}'
          }
        ]
      },
      ebOrderPlacedNotifciation: {
        handler: 'src/functions/ebOrderPlacedNotifciation/index.handler',
        events: [
          {
            eventBridge: {
              eventBus: '${self:custom.eventBridgeBusName}',
              pattern: {
                source: ['order.placed'],
              }
            },
          },
        ],
        //@ts-expect-error
        iamRoleStatementsInherit: true,
        iamRoleStatements: [
          {
            Effect: 'Allow',
            Action: ['ses:sendEmail'],
            Resource: '*'
          }
        ]
      },
      ebOrderPlacedWarehouse: {
        handler: 'src/functions/ebOrderPlacedWarehouse/index.handler',
        events: [
          {
            eventBridge: {
              eventBus: '${self:custom.eventBridgeBusName}',
              pattern: {
                source: ['order.placed'],
              }
            },
          },
        ],
        //@ts-expect-error
        iamRoleStatements: [iamGetSecret]
      },
      
      ebOrderPackedNotification: {
        handler: 'src/functions/ebOrderPackedNotification/index.handler',
        events: [
          {
            eventBridge: {
              eventBus: '${self:custom.eventBridgeBusName}',
              pattern: {
                source: ['order.packed'],
              }
            },
          },
        ],
        //@ts-expect-error
        iamRoleStatementsInherit: true,
        iamRoleStatements: [
          {
            Effect: 'Allow',
            Action: ['ses:sendEmail'],
            Resource: '*'
          }
        ]
      },
      
      warehousePacked: {
        handler: 'src/functions/warehousePacked/index.handler',
        events: [
          {
            http: {
              method: 'post',
              path: 'orderpacked/{orderId}',
              cors: corsSettings,
            }
          }
        ],
        //@ts-expect-error
        iamRoleStatementsInherit: true,
        iamRoleStatements: [iamGetSecret]
      },

      ebOrderPackedDeliveryService: {
        handler: 'src/functions/ebOrderPackedDeliveryService/index.handler',
        events: [
          {
            eventBridge: {
              eventBus: '${self:custom.eventBridgeBusName}',
              pattern: {
                source: ['order.packed'],
              }
            },
          },
        ],
        //@ts-expect-error
        iamRoleStatementsInherit: true,
        iamRoleStatements: [iamGetSecret]
      },

      deliveryServiceDelivered: {
        handler: 'src/functions/deliveryServiceDelivered/index.handler',
        events: [
          {
            http: {
              method: 'post',
              path: 'orderdelivered/{orderId}',
              cors: corsSettings,
            }
          }
        ],
        //@ts-expect-error
        iamRoleStatementsInherit: true,
        iamRoleStatements: [iamGetSecret]
      },

      ebOrderDeliveredNotification: {
        handler: 'src/functions/ebOrderDeliveredNotification/index.handler',
        events: [
          {
            eventBridge: {
              eventBus: '${self:custom.eventBridgeBusName}',
              pattern: {
                source: ['order.delivered'],
              }
            },
          },
        ],
        //@ts-expect-error
        iamRoleStatementsInherit: true,
        iamRoleStatements: [
          {
            Effect: 'Allow',
            Action: ['ses:sendEmail'],
            Resource: '*'
          }
        ]
      },


    }

export default functions;