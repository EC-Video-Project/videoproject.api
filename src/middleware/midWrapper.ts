import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy, { MiddyfiedHandler } from '@middy/core';
import inputOutputLogger from '@middy/input-output-logger';
// import validator from '@middy/validator';
// import httpJsonBodyParser from '@middy/http-json-body-parser';

type handlerFunction = (e: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export default function(handler: handlerFunction): MiddyfiedHandler {
  return middy(handler)
  .use(inputOutputLogger())
    // .use(validator());
    // .use(httpJsonBodyParser())
}