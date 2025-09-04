import type { AWS } from '@serverless/typescript';

const CognitoConfig: AWS['resources']['Resources'] = {
    CognitoUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
            UserPoolName: "${sls:stage}-${self:service}-user-pool",
            UsernameAttributes: ["email"],
            AutoVerifiedAttributes: ["email"],
            Policies: {
                PasswordPolicy: {
                    MinimumLength: 8,
                    RequireLowercase: false,
                    RequireNumbers: false,
                    RequireSymbols: false,
                    RequireUppercase: false,
                }
            }
        }
    },
    CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
            UserPoolId: {Ref: "CognitoUserPool"},
            CallbackURLs: ['https://localhost:3000'],
            SupportedIdentityProviders: ['COGNITO'],
            ExplicitAuthFlows: [
                "ALLOW_USER_SRP_AUTH",
                "ALLOW_USER_PASSWORD_AUTH",
                "ALLOW_REFRESH_TOKEN_AUTH",
                "ALLOW_CUSTOM_AUTH",
            ]
        }
    }
}

export default CognitoConfig;