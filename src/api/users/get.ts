import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import midWrapper from '../../middleware/midWrapper';

AWS.config.update({ region: "us-west-2"});
const dynamo = new AWS.DynamoDB.DocumentClient();

const rawHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.userId;
  
  const queryParams = {
    TableName : 'users',
    KeyConditionExpression: 'userId = :sub',
    ExpressionAttributeValues: {
      ':sub': id
    },
  };

  let resBody;

  try {
    resBody = await dynamo.query(queryParams).promise();
  } catch (err) {
    resBody = err;
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(resBody)
  };
};

export const handler = midWrapper(rawHandler);