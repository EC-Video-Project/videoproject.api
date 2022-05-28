import { S3Client } from "@aws-sdk/client-s3";

export const createS3Client = (): S3Client => {
  return new S3Client({});
};
