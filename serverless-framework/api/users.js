var rg = require("random-greetings");

("use strict");

module.exports.handler = async (event) => {
  const greeting = "This is a message from Ethan";

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        greeting,
        randomGreeting: rg.greet(),
      },
      null,
      2
    ),
  };
};
