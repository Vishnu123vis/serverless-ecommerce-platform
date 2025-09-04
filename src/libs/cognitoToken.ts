import {
    AdminCreateUserCommand,
    AdminInitiateAuthCommand,
    AdminSetUserPasswordCommand,
    AttributeType,
    AuthenticationResultType,
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
  } from "@aws-sdk/client-cognito-identity-provider";
  
  /**
   * Get credentials from an existing user
   */
  export const CognitoSignIn = async (params: {
    clientId: string;
    userPoolId: string;
    username: string;
    password: string;
    config?: CognitoIdentityProviderClientConfig;
  }): Promise<AuthenticationResultType> => {
    const { clientId, userPoolId, username, password, config } = params;
    const client = new CognitoIdentityProviderClient(config);
  
    const { AuthenticationResult } = await client.send(
      new AdminInitiateAuthCommand({
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        ClientId: clientId,
        UserPoolId: userPoolId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      })
    );
  
    if (!AuthenticationResult) {
      throw new Error("AuthenticationResult is undefined");
    }
  
    return AuthenticationResult;
  };
  
  /**
   * Create a new user, confirm the user, return credentials
   */
  export const CognitoSignUp = async (params: {
    clientId: string;
    userPoolId: string;
    username: string;
    password: string;
    attributes?: AttributeType[];
    config?: CognitoIdentityProviderClientConfig;
  }): Promise<AuthenticationResultType> => {
    const {
      clientId,
      userPoolId,
      username,
      password,
      attributes,
      config,
    } = params;
  
    const client = new CognitoIdentityProviderClient(config);
  
    try {
      await client.send(
        new AdminCreateUserCommand({
          UserPoolId: userPoolId,
          Username: username,
          DesiredDeliveryMediums: [],
          UserAttributes: attributes,
        })
      );
    } catch (error: any) {
      if (error.name !== "UsernameExistsException") {
        throw error;
      }
    }
  
    await client.send(
      new AdminSetUserPasswordCommand({
        UserPoolId: userPoolId,
        Username: username,
        Password: password,
        Permanent: true,
      })
    );
  
    return CognitoSignIn({
      clientId,
      userPoolId,
      username,
      password,
      config,
    });
  };
  