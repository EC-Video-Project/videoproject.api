'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-west-2'});

module.exports.handler = async (event) => {
  // const greeting = 'This is a message from Ethan';
  const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2'}); // json formatting

  const params = {
    TableName: 'users',
  }

  let body;

  try {
    body = await dynamo.scan(params).promise();
  } catch (err) {
    body = err;
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(body)
    // body: JSON.stringify(
    //   {
    //     message: 'Go Serverless v3.0! Your function executed successfully!',
    //     greeting,
    //   },
    //   null,
    //   2
    // ),
  };
};