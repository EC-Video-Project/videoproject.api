import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const rawDynamoClientConfig = {};

export const getRawDynamoClient = () => {
  const rawDynamoClient = new DynamoDBClient(rawDynamoClientConfig);
  return rawDynamoClient;
};

export const getDynamoClient = () => {
  const rawDynamoClient = getRawDynamoClient();
  const dynamoClient = DynamoDBDocumentClient.from(rawDynamoClient);

  return dynamoClient;
};
