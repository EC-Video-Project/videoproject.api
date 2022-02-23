("use strict");

module.exports.handler = async (event) => {
  const greeting = "This is a message from Ethan";

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        greeting,
      },
      null,
      2
    ),
  };
};
