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

const ALLOWED_MIME_TYPES = ["video/mp4"];

type FileUpload = {
  content: any;
  mimetype: string;
};

const validateVideo = (video: FileUpload) => {
  if (!video || !video.content)
    throw "Video data is either missing or malformed";
  if (!ALLOWED_MIME_TYPES.includes(video.mimetype))
    throw `Video must be of type ${ALLOWED_MIME_TYPES.toString()}`;
};

const uploadVideo = async (
  video: FileUpload,
  newVideoId: string
): Promise<void> => {
  try {
    const client = new S3Client({});
    const command = new PutObjectCommand({
      Bucket: await getSsmParameter("/video/storageBucketName"),
      Key: newVideoId,
      Body: video.content,
      ContentType: video.mimetype,
    });

    await client.send(command);
  } catch (error) {
    console.error(error);
    throw "An error occurred while saving video to object store";
  }
};

const baseHandler = async ({
  body: { video },
}: HttpJsonEvent): Promise<APIGatewayProxyResult> => {
  validateVideo(video); // should be using http-errors

  const newVideoId = uuidv4();

  await uploadVideo(video, newVideoId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "Success",
      videoId: newVideoId,
    }),
  };
};

const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        tags: { type: "string" },
        video: { type: "object" },
      },
      required: ["tags", "video"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(httpHeaderNormalizer())
  .use(httpMultipartBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
