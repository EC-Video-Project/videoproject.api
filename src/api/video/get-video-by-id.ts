import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/types/HttpJsonEvent";
import { getPresignedS3Url } from "src/utilities/getPresignedS3Url";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  const videoId = event.pathParameters.videoId;

  // todo: do some kind of regex validation here

  const fileUrl = await getPresignedS3Url(videoId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      fileId: videoId,
      url: fileUrl,
    }),
  };
};

export const handler = middy(baseHandler).use(httpErrorHandler());
