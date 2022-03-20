import * as AWS from 'aws-sdk';
import * as JwtHelper from './helpers/jwts';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import midWrapper from '../../middleware/midWrapper';

AWS.config.update({ region: 'us-west-2'});

const rawHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userInfo = JwtHelper.userInfo(event.headers.Authorization);
  const userParams = JSON.parse(event.body || '{}');

  const id = userParams.userId || userInfo.sub;
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
  await dynamo.put(params, function(err, data) {
    if (err) console.log(err);
    else {
      console.log(data);
      resBody = data;
    }
  });
  // try {
  //   resBody = await dynamo.put(params).promise();
  //   console.log(resBody);
  // } catch (err) {
  //   resBody = err;
  //   console.log(err);
  // }

  return {
    statusCode: 200,
    body: JSON.stringify(resBody)
  }
}

export const handler = midWrapper(rawHandler);