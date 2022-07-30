import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { Tag } from "src/models/Tag";
import { createTag } from "src/persistence/tag/createTag";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  let tag: Tag;

  try {
    tag = Tag.new({
      id: undefined,
      name: event.body.email,
      type: event.body.phone,
    });
  } catch (e) {
    console.info(e);
    console.info(event);
    return { statusCode: 400, body: JSON.stringify({ message: e }) };
  }

  try {
    await createTag(tag);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Tag created successfully!",
        tag,
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
        id: { type: "number" },
        name: { type: "string" },
        type: { type: "string" },
      },
      required: ["id", "name", "type"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());