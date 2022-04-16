import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoClient } from "src/awsClients/dynamo";
import { UserVideo } from "src/models/UserVideo";
import { UserVideoDb, UserVideoDbTag } from "src/models/UserVideoDb";

const userVideoModelToDb = (
  userVideo: UserVideo
): { video: UserVideoDb; tags: UserVideoDbTag[] } => {
  const video = {
    PK: `uservideo#${userVideo.id}`,
    SK: `uservideo#${userVideo.id}`,
    userId: userVideo.userId,
  };

  const tags = userVideo.tags.map((tag) => {
    return {
      PK: `uservideo#${userVideo.id}`,
      SK: `tag#${tag.type}#${tag.value}`,
    };
  });

  return { video, tags };
};

const userVideoDbToModel = (
  userVideoDb: UserVideoDb,
  tags: UserVideoDbTag[] = []
): UserVideo => {
  return {
    id: userVideoDb.PK,
    tags: [], // todo fix
    userId: userVideoDb.userId,
  };
};

export const createUserVideo = async (userVideo: UserVideo): Promise<void> => {
  const client = getDynamoClient();

  const { video, tags } = userVideoModelToDb(userVideo);

  const itemsToWriteToDb = [{ PutRequest: { Item: video as any } }];
  tags.forEach((x) =>
    itemsToWriteToDb.push({ PutRequest: { Item: x as any } })
  );

  const command = new BatchWriteCommand({
    RequestItems: { VideosTags: itemsToWriteToDb },
  });

  const result = await client.send(command);

  // Per AWS docs, it's unlikely, but we gotta rerun request if some items fail
  let unprocessedItems = result.UnprocessedItems;
  while (unprocessedItems && Object.keys(unprocessedItems).length > 0) {
    const output = await client.send(
      new BatchWriteCommand({ RequestItems: unprocessedItems })
    );
    unprocessedItems = output.UnprocessedItems;
  }
};
