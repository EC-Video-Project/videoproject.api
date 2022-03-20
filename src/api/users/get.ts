import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as JwtHelper from './helpers/jwts';
import midWrapper from '../../middleware/midWrapper';

AWS.config.update({ region: "us-west-2"});

const rawHandler = async (event: APIGatewayProxyEvent) => {
  const userInfo = JwtHelper.userInfo(event.headers.Authorization);
  const id = event.pathParameters ? event.pathParameters.userId : userInfo.sub;
  
  const queryParams = {
    TableName : 'users',
    KeyConditionExpression: 'userId = :sub',
    ExpressionAttributeValues: {
      ':sub': id
    },
  };

  let resBody;

  const dynamo = new AWS.DynamoDB.DocumentClient();
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