import * as AWS from 'aws-sdk';
import * as JwtHelper from './helpers/jwts';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import midWrapper from '../../middleware/midWrapper';

AWS.config.update({ region: 'us-west-2'});
const dynamo = new AWS.DynamoDB.DocumentClient();

const rawHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userParams = JSON.parse(event.body || '{}');
  const params = {
    TableName: 'users',
    Item: JwtHelper.autofillParams(event.headers.Authorization, userParams)
  };
  
  let resBody;
  
  try {
    resBody = await dynamo.put(params).promise();
    console.log(params);
  } catch (err) {
    resBody = err;
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(resBody)
  }
}

export const handler = midWrapper(rawHandler);