import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { getUserVideos } from "src/persistence/getUserVideos";
import { parseTagsFromQueryString } from "../helpers/parseTagsFromQueryString";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  const tags = parseTagsFromQueryString(event.queryStringParameters);

  const result = await getUserVideos(tags);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

export const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
