import { APIGatewayProxyEvent } from "aws-lambda";
import Secrets from './Secrets';

const apiKeyAuth = async (event: APIGatewayProxyEvent) => {
    if (!event.headers?.Authorization) {
        throw Error("Authorization header is required")
    }

    const authToken = event.headers.Authorization;

    const formattedPath = event.resource.replaceAll("{", "_").replaceAll("}", "_");

    const secretString = await Secrets.getSecret(
        `${process.env.APP_PREFIX}auth-${formattedPath}`
      );
    if (!secretString) {
        throw Error("No API Key Provided")
    }

    const secretObj = JSON.parse(secretString);

    if (Object.values(secretObj).includes(authToken)) {
        return;
    }
    throw Error("API Key Provided is not valid")

}

    const Authorisation = {
        apiKeyAuth
    }

export default Authorisation;