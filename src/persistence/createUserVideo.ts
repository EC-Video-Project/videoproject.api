import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoClient } from "src/awsClients/dynamo";
import { UserVideo } from "src/models/UserVideo";
import { UserVideoDb } from "src/models/UserVideoDb";

const userVideoModelToDb = (userVideo: UserVideo): UserVideoDb => {
  return {
    PK: `uservideo#${userVideo.Id}`,
    SK: `uservideo#${userVideo.Id}`,
    userId: userVideo.userId,
  };
};

const userVideoDbToModel = (userVideoDb: UserVideoDb): UserVideo => {
  return {
    Id: userVideoDb.PK,
    Tags: [], // todo fix
    userId: userVideoDb.userId,
  };
};

export const createUserVideo = async (userVideo: UserVideo) => {
  const client = getDynamoClient();

  const Item = userVideoModelToDb(userVideo);

  const command = new PutCommand({ TableName: "VideosTags", Item });
  await client.send(command);
};
