import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { User } from "src/models/User";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  let user: User;

  try {
    user = User.new({
      displayName: event.body.displayName,
      email: event.body.email,
      phone: event.body.phone,
      employerMode: event.body.employerMode,
      bio: event.body.bio,
      profileLinks: event.body.profileLinks,
    });
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify(e) };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "The endpoint works!", body: event.body }),
  };
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
          type: "object",
          properties: {
            type: { type: "string" },
            url: { type: "string" },
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
