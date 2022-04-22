import { APIGatewayProxyEvent } from "aws-lambda";

export type HttpJsonEvent = {
  body: any;
} & APIGatewayProxyEvent;
