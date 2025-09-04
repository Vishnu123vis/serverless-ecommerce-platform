import { AWS } from "@serverless/typescript";

const SecretsConfig: AWS['resources']['Resources'] = {
  warehouseApiKey: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API Key to call warehouse',
      Name: "${self:provider.environment.APP_PREFIX}warehouse-api-key",
      SecretString: "${env:warehouseApiKey}"
    },
  },

  orderpackedApiKeys: {
    Type: 'AWS::SecretsManager::Secret',
    DeletionPolicy: 'Retain',
    Properties: {
      Description: "Warehouse enters this API key",
      Name: "${self:provider.environment.APP_PREFIX}auth-/orderpacked/_orderId_-v2",
      SecretString: "${env:orderpackedApiKeys}"
    },
  },

  orderdeliveredApiKey: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: "Delivery Service enters this API key",
      Name: "${self:provider.environment.APP_PREFIX}auth-/orderdelivered/_orderId_",
      SecretString: "${env:orderdeliveredApiKey}"
    },
  },
};

export default SecretsConfig;