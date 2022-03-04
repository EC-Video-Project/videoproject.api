'use strict';
const AWS = require('aws-sdk');
const JwtHelper = require('./helpers/jwts')

AWS.config.update({ region: "us-west-2"});

module.exports.handler = async (event) => {
  let userInfo = JwtHelper.userInfo(event.headers.Authorization);
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let resBody;

  const queryParams = {
    TableName : 'users',
    KeyConditionExpression: 'userId = :sub',
    ExpressionAttributeValues: {
        ':sub': userInfo.sub
    }
  };

  documentClient.query(queryParams, function(err, data) {
    if (err) console.log(err);
    else {
      resBody = data;
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(resBody)
  };
};