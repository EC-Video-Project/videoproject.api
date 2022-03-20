import middy from '@middy/core';
import inputOutputLogger from '@middy/input-output-logger';
import httpJsonBodyParser from '@middy/http-json-body-parser';

export default function(handler) {
  return middy(handler)
    .use(inputOutputLogger())
    .use(httpJsonBodyParser())
}