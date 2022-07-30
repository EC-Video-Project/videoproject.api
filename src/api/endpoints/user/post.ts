import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { User } from "src/models/User";
import { createUser } from "src/persistence/user/createUser";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  let user: User;
  const cognitoUsername = event.requestContext.authorizer.jwt.claims.username;

  try {
    user = User.new({
      id: event.requestContext.authorizer.jwt.claims.sub,
      cognitoUsername: cognitoUsername,
      displayName: event.body.displayName,
      email: event.body.email,
      phone: event.body.phone,
      employerMode: event.body.employerMode,
      bio: event.body.bio,
      profileLinks: event.body.profileLinks,
    });
  } catch (e) {
    console.info(e);
    console.info(event);
    return { statusCode: 400, body: JSON.stringify({ message: e }) };
  }

  try {
    await createUser(user);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User profile created successfully!",
        user,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e }),
    };
  }
};

const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        displayName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        employerMode: { type: "boolean" },
        bio: { type: "string" },
        profileLinks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              url: { type: "string" },
            },
            required: ["type", "url"],
          },
        },
      },
      required: ["displayName", "email", "phone", "employerMode"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
