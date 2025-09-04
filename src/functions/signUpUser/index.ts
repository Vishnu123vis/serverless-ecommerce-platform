import { APIGatewayProxyHandler } from "aws-lambda";
import { httpResponse } from "@libs/APIResponses";
import { CognitoSignUp } from "@libs/cognitoToken";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { clientId, userPoolId, username, password } = JSON.parse(event.body || '{}');

    if (!clientId || !userPoolId || !username || !password) {
      return httpResponse({
        statusCode: 400,
        body: { error: "Missing required fields" }
      });
    }

    await CognitoSignUp({ clientId, userPoolId, username, password });

    return httpResponse({
      statusCode: 200,
      body: { message: 'User created successfully' }
    });
  } catch (error) {
    console.error('Error during signUpUser', error);
    return httpResponse({
      statusCode: 500,
      body: { error: 'Internal server error' }
    });
  }
};
