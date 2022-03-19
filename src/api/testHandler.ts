import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const midWrapper = require('../middleware/midWrapper');

AWS.config.update({ region: 'us-west-2'});

const rawHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
console.log("it worked")
  return {
    statusCode: 200,
    body: JSON.stringify(resBody)
  };
};

module.exports.handler = midWrapper(rawHandler);