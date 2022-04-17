import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoClient } from "src/awsClients/dynamo";
import { Tag } from "src/models/Tag";
import { UserVideo } from "src/models/UserVideo";
import { UserVideoDb } from "src/models/UserVideoDb";

const tagToDbTag = (tag: Tag): string => `tag#${tag.type}#${tag.value}`;

const userVideoToDbItems = (userVideo: UserVideo): UserVideoDb[] => {
  const allDbTags = userVideo.tags.map((tag) => tagToDbTag(tag));
  allDbTags.push("tag#all");

  return allDbTags.map((tag) => ({
    PK: tag,
    SK: `uservideo#${userVideo.id}`,
    userId: userVideo.userId,
    tags: allDbTags,
  }));
};

export const createUserVideo = async (userVideo: UserVideo): Promise<void> => {
  const client = getDynamoClient();

  const itemsToWriteToDb = userVideoToDbItems(userVideo);

  const command = new BatchWriteCommand({
    RequestItems: {
      VideosTags: itemsToWriteToDb.map((Item) => ({ PutRequest: { Item } })),
    },
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
