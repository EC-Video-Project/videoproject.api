import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { getAllTags } from "src/persistence/tag/getAllTags";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  const tags = await getAllTags();

  return {
    statusCode: 200,
    body: JSON.stringify({ tags }),
  };
};

export const handler = middy(baseHandler)
  .use(httpErrorHandler());
