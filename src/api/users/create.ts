import * as AWS from 'aws-sdk';
const JwtHelper = require('./helpers/jwts');
import { APIGatewayProxyEvent } from 'aws-lambda';

AWS.config.update({ region: 'us-west-2'});

module.exports.handler = async (event: APIGatewayProxyEvent) => {
  const userInfo = JwtHelper.userInfo(event.headers.Authorization);
  const userParams = JSON.parse(event.body || '{}');

  const id = userParams.userId || userInfo.userId;
  const { 
    bio, 
    employerMode,
    email,
    firstName,
    lastName,
    profilePic,
    socials,
    starredPostings,
    username
  } = userParams;

  // validate userParams

  const params = {
    TableName : 'users',
    Item: {
      userId: id,
      bio,
      employerMode,
      email,
      firstName,
      lastName,
      profilePic,
      socials,
      starredPostings,
      username
    },
    ReturnValues: 'ALL_NEW'
  };

  let resBody;
  
  const dynamo = new AWS.DynamoDB.DocumentClient();
  // dynamo.put(params, function(err, data) {
  //   if (err) console.log(err);
  //   else {
  //     console.log(data);
  //     resBody = data;
  //   }
  // });
  try {
    resBody = await dynamo.put(params).promise();
  } catch (err) {
    resBody = err;
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(resBody)
  }
}