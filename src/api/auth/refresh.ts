import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { getSsmParameter } from "src/utilities/getSsmParameter";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  const { refresh_token } = event.body as any;

  if (!refresh_token || refresh_token.length === 0)
    throw "Refresh token is required";

  // Setup data object to send to cognito TOKEN endpoint
  const data = new URLSearchParams();
  data.append("grant_type", "refresh_token");
  data.append("client_id", await getSsmParameter("/cognito/devlocal/clientId"));
  data.append("refresh_token", refresh_token);

  // Build an encoded string to use for authentication w/ cognito TOKEN endpoint
  const cognitoClientId = await getSsmParameter("/cognito/devlocal/clientId");
  const cognitoClientSecret = await getSsmParameter(
    "/cognito/devlocal/clientSecret",
    true
  );
  const encodedAuthorizationStr = Buffer.from(
    `${cognitoClientId}:${cognitoClientSecret}`
  ).toString("base64");

  return axios
    .post(`${await getSsmParameter("/cognito/domain")}/oauth2/token`, data, {
      headers: {
        Authorization: `Basic ${encodedAuthorizationStr}`,
      },
    })
    .then((tokenResponse) => {
      return { statusCode: 200, body: JSON.stringify(tokenResponse.data) };
    })
    .catch((error) => {
      const errorMsg = error.response?.data?.error ?? "Unexpected error";

      // errors from cognito: https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
      // any errors other than "invalid_grant" are probably on us, otherwise, tell client they have bad code/token

      if (errorMsg === "invalid_grant") {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Token no longer valid. Please get a new one!",
          }),
        };
      } else {
        console.error(`[Cognito] ${errorMsg}`);
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: "Error handling token request with authorization provider",
          }),
        };
      }
    });
};

const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        refresh_token: { type: "string" },
      },
      required: ["refresh_token"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
