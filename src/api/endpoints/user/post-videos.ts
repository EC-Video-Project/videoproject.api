import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import { HttpJsonEvent } from "src/api/types/HttpJsonEvent";
import { videoUploadJsonBodyParser } from "src/api/middleware/videoUploadJsonBodyParser";

const baseHandler = async ({
  body,
  headers,
}: HttpJsonEvent): Promise<APIGatewayProxyResult> => {
  throw "not implemented";
  // let tags: Tag[] = [];

  // try {
  //   validateFileUpload(body.video);
  //   tags = body.tags.map((tag) => Tag.parse(tag.type, tag.value));
  // } catch (error) {
  //   throw new httpError.BadRequest(error);
  // }

  // const { userId } = userInfo(headers.authorization);
  // const id = getTimestampId();

  // const newVideo = new Introduction(id, tags, userId);

  // await saveFileToObjectStore(body.video, newVideo.id);

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     status: "Success",
  //     newVideo,
  //   }),
  // };
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
