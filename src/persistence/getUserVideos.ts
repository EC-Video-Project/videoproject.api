import { QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoClient } from "src/awsClients/dynamo";
import { dbTagToTag, Tag, tagToDbTag } from "src/models/Tag";
import { UserVideo } from "src/models/UserVideo";

const dbUserVideoToUserVideo = (dbEntity): UserVideo => {
  return {
    id: dbEntity.SK.replace("uservideo#", ""),
    tags: dbEntity.tags.map((dbTag: string) => dbTagToTag(dbTag)),
    userId: dbEntity.userId,
  };
};

export const getUserVideos = async (tags: Tag[] = []): Promise<UserVideo[]> => {
  const client = getDynamoClient();

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
        ScanIndexForward: true,
      })
    )
  );

  const allResults = await Promise.all(results);

  let dbItems = allResults.flatMap((x) => x.Items);
  dbItems = [...new Set(dbItems)]; // remove duplicates

  const userVideos = dbItems.map((item) => dbUserVideoToUserVideo(item));

  return userVideos;
};
