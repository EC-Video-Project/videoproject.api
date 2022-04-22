import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import midWrapper from '../middleware/midWrapper';

AWS.config.update({ region: 'us-west-2'});

const rawHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const params = {
    TableName: 'users',
  }
  
  let resBody;
  
  const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2'}); // DocumentClient uses json formatting
  try {
    resBody = await dynamo.scan(params).promise();
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