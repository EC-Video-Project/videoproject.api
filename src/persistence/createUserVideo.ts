import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { tagToDbTag } from "src/models/Tag";
import { UserVideo } from "src/models/UserVideo";
import { DbUserVideoItem } from "src/models/DbUserVideo";

const userVideoToDbItems = (userVideo: UserVideo): DbUserVideoItem[] => {
  const allDbTags = userVideo.tags.map((tag) => tagToDbTag(tag));

  const buildItem = (PK: string): DbUserVideoItem => ({
    PK,
    SK: `uservideo#${userVideo.id}`,
    userId: userVideo.userId,
    tags: allDbTags,
  });

  const items = allDbTags.map((tag) => buildItem(tag));
  items.push(buildItem("tag#all"));

  return items;
};

export const createUserVideo = async (
  client: DynamoDBDocumentClient,
  userVideo: UserVideo
): Promise<boolean> => {
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

  return true;
};
