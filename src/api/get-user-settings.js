exports.handler = async (event) => {
  console.log(event);

  // do cool stuff here

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };

  return response;
};
