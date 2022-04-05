// alternative name for file: addProfileVideo.ts ??

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/types/HttpJsonEvent";
import { getSsmParameter } from "src/utilities/getSsmParameter";
import { v4 as uuidv4 } from "uuid";

const baseHandler = async (
  event: HttpJsonEvent
): Promise<APIGatewayProxyResult> => {
  const newVideoId = uuidv4();

  try {
    const client = new S3Client({});
    const command = new PutObjectCommand({
      Bucket: await getSsmParameter("/video/storageBucketName"),
      Key: newVideoId,
      Body: event.body.video.content,
      ContentType: "video/mp4",
    });

    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "Success",
        videoId: newVideoId,
        response,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "There was an error uploading your video",
      }),
    };
  }
};

const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        tags: { type: "string" },
      },
      required: ["tags"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(httpHeaderNormalizer())
  .use(httpMultipartBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
