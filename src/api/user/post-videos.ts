// alternative name for file: addProfileVideo.ts ??

import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/types/HttpJsonEvent";
import * as createError from "http-errors";
import { videoUploadJsonBodyParser } from "src/api/middleware/videoUploadJsonBodyParser";
import { UserVideo } from "src/models/UserVideo";
import { createUserVideo } from "src/persistence/createUserVideo";
import { saveFileToObjectStore } from "src/persistence/saveFileToObjectStore";
import { validateFileUpload } from "../../model-validators/fileUpload";
import { validateTags } from "src/model-validators/tags";
import { userInfo } from "../helpers/jwts";
import { getTimestampId } from "src/utilities/getTimestampId";

const baseHandler = async ({
  body,
  headers,
}: HttpJsonEvent): Promise<APIGatewayProxyResult> => {
  try {
    validateFileUpload(body.video);
    validateTags(body.tags);
  } catch (error) {
    throw new createError.BadRequest(error);
  }

  const { userId } = userInfo(headers.authorization); // todo: (eh) i think this function should be moved

  const newVideo: UserVideo = {
    id: getTimestampId(),
    tags: body.tags,
    userId,
  };

  await saveFileToObjectStore(body.video, newVideo.id);

  await createUserVideo(newVideo);

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "Success",
      newVideo,
    }),
  };
};

// can we generate this from typescript definitions?
// there is a trello card for this
const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        tags: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              value: { type: "string" },
            },
            required: ["type", "value"],
          },
        },
        video: { type: "object" },
      },
      required: ["tags", "video"],
    },
  },
};

export const handler = middy(baseHandler)
  .use(httpHeaderNormalizer())
  .use(httpMultipartBodyParser())
  .use(videoUploadJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
