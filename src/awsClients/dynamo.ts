import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const rawDynamoClientConfig = {};

export const createRawDynamoClient = (): DynamoDBClient => {
  const rawDynamoClient = new DynamoDBClient(rawDynamoClientConfig);
  return rawDynamoClient;
};

export const createDynamoClient = (): DynamoDBDocumentClient => {
  const rawDynamoClient = createRawDynamoClient();
  const dynamoClient = DynamoDBDocumentClient.from(rawDynamoClient);

  return dynamoClient;
};
