'use strict';
const AWS = require('aws-sdk');
const JwtHelper = require('./helpers/jwts')

AWS.config.update({ region: 'us-west-2'});

module.exports.handler = async (event) => {
  let userInfo = JwtHelper.userInfo(event.headers.Authorization);
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let resBody;

  // validate event params

  // use event params
  const putParams = {
    TableName : 'users',
    Item: {
      userId: userInfo.sub,
      bio: 'buncha text here',
      employerMode: false
    }
  };
  
  documentClient.put(putParams, function(err, data) {
    if (err) console.log(err);
    else {
      console.log(data);
      resBody = data;
    }
  });

  return {
    statusCode: 200,
    body: resBody
  }
}