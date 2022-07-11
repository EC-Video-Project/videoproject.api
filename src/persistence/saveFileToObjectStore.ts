import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { FileUpload } from "src/models/FileUpload";
import { getSsmParameter } from "src/utilities/getSsmParameter";

export const saveFileToObjectStore = async (
  video: FileUpload,
  newVideoId: string
): Promise<void> => {
  try {
    const client = new S3Client({});
    const command = new PutObjectCommand({
      Bucket: await getSsmParameter("obj_bucket_name"),
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
