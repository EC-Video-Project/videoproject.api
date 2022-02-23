"use strict";

module.exports.handler = async (event) => {
  console.log("this is a test message");

  console.log(JSON.stringify(process.env));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        myVariable: "test " + process.env.APP_TEST_VAR,
      },
      null,
      2
    ),
  };
};
