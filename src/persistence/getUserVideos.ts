import { QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { createDynamoClient } from "src/awsClients/dynamo";
import { DbUserVideoItem } from "src/persistence/types/DbUserVideo";
import { Tag, tagToDbTag } from "src/models/Tag";
import { UserVideo } from "src/models/UserVideo";

export const dbTagToTag = (tag: string): Tag => {
  const parts = tag.split("#");
  return Tag.parse(parts[1], parts[2]);
};

const dbUserVideoToUserVideo = (dbEntity: DbUserVideoItem): UserVideo =>
  new UserVideo(
    dbEntity.SK.replace("uservideo#", ""),
    dbEntity.tags.map((dbTag: string) => dbTagToTag(dbTag)),
    dbEntity.userId
  );

export const getUserVideos = async (tags: Tag[] = []): Promise<UserVideo[]> => {
  const client = createDynamoClient();

  const queryTags = tags.map((tag) => tagToDbTag(tag));
  if (queryTags.length === 0) queryTags.push("tag#all");

  const results: Promise<QueryCommandOutput>[] = queryTags.map((dbTag) =>
    client.send(
      new QueryCommand({
        TableName: "VideosTags",
        ExpressionAttributeValues: {
          ":PK": dbTag,
          ":SK": "uservideo#",
        },
        KeyConditionExpression: "PK = :PK AND begins_with(SK, :SK)",
      })
    )
  );

  const allResults = await Promise.all(results);

  const dbItems = allResults.flatMap((x) => x.Items);

  // remove duplicates
  const uniqueDbItems = [];
  dbItems.forEach((x) => {
    if (uniqueDbItems.findIndex((y) => y.SK === x.SK) === -1)
      uniqueDbItems.push(x);
  });

  const userVideos = uniqueDbItems
    .map((item) => dbUserVideoToUserVideo(item))
    .sort((a, b) => b.id.localeCompare(a.id));

  return userVideos;
};
