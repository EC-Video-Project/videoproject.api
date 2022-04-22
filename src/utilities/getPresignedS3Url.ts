import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSsmParameter } from "src/utilities/getSsmParameter";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getPresignedS3Url = async (filename: string): Promise<string> => {
  const client = new S3Client({});
  const command = new GetObjectCommand({
    Bucket: await getSsmParameter("/video/storageBucketName"),
    Key: filename,
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
};
