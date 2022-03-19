const middy = require('@middy/core');
const inputOutputLogger = require('@middy/input-output-logger');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

module.exports = function(handler) {
  return middy(handler)
    .use(inputOutputLogger())
    .use(httpJsonBodyParser())
};