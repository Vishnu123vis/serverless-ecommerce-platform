import { APIGatewayProxyHandler } from "aws-lambda";
import { httpResponse } from "@libs/APIResponses";
import { CognitoSignIn} from "@libs/cognitoToken";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { clientId, userPoolId, username, password } = JSON.parse(event.body || '{}');

    if (!clientId || !userPoolId || !username || !password) {
      return httpResponse({
        statusCode: 400,
        body: { error: "Missing required fields" }
      });
    }

    const response = await CognitoSignIn({ clientId, userPoolId, username, password });

    return httpResponse({
      statusCode: 200,
      body: { token: response.IdToken }
    });
  } catch (error) {
    console.error('Error during signInUser', error);
    return httpResponse({
      statusCode: 500,
      body: { error: 'Internal server error' }
    });
  }
};
