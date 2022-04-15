import * as createError from "http-errors";

// Parses all request body fields into JSON, except for
// "video" field, as that one contains binary data

export const videoUploadJsonBodyParser = () => {
  const before = async (request) => {
    try {
      Object.keys(request.event.body)
        .filter((x) => x !== "video")
        .forEach((key) => {
          request.event.body[key] = JSON.parse(request.event.body[key]);
        });
    } catch (error) {
      console.error("Error parsing JSON body");
      console.error(error);
      throw new createError.BadRequest(
        "Error parsing JSON. With exception of 'video' binary field, ensure all fields are valid JSON"
      );
    }
  };

  return { before };
};
