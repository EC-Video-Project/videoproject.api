import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  throw "Not Implemented";

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

export const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
