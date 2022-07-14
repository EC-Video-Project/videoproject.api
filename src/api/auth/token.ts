import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { getSsmParameter } from "src/utilities/getSsmParameter";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  const { code } = event.body as any;

  if (!code || code?.length === 0) throw "Code is required";

  // Setup data object to send to cognito TOKEN endpoint
  const data = new URLSearchParams();
  data.append("grant_type", "authorization_code");
  data.append("client_id", await getSsmParameter("cognito_devlocal_clientId"));
  data.append(
    "redirect_uri",
    await getSsmParameter("cognito_devlocal_redirectUrl")
  );
  data.append("code", code);

  // Build an encoded string to use for authentication w/ cognito TOKEN endpoint
  const cognitoClientId = await getSsmParameter("cognito_devlocal_clientId");
  const cognitoClientSecret = await getSsmParameter(
    "cognito_devlocal_clientSecret",
    true
  );
  const encodedAuthorizationStr = Buffer.from(
    `${cognitoClientId}:${cognitoClientSecret}`
  ).toString("base64");

  // Return cognito's tokens to the user, or an error
  return axios
    .post(`${await getSsmParameter("cognito_domain")}/oauth2/token`, data, {
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
        code: { type: "string" },
      },
      required: ["code"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
