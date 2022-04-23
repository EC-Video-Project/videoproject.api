import middy from "@middy/core";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/types/HttpJsonEvent";
import { getPresignedS3Url } from "src/utilities/getPresignedS3Url";
import { timestampIdRegex } from "src/utilities/getTimestampId";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  const videoId = event.pathParameters.videoId;

  const fileUrl = await getPresignedS3Url(videoId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      fileId: videoId,
      url: fileUrl,
    }),
  };
};

const inputSchema = {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        videoId: {
          type: "string",
          pattern: timestampIdRegex.source,
        },
      },
      required: ["videoId"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
