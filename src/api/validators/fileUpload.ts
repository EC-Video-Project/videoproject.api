import { FileUpload } from "src/models/FileUpload";

const ALLOWED_MIME_TYPES = ["video/mp4"];

export const validateFileUpload = (file: FileUpload): void => {
  if (!file || !file.content) throw "Video data is either missing or malformed";
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype))
    throw `Video must be of type ${ALLOWED_MIME_TYPES.toString()}`;
};
