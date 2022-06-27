import { describe } from "mocha";
import { Tag } from "src/models/Tag";
import { UserVideo } from "src/models/UserVideo";
import { createUserVideo } from "src/persistence/createUserVideo";
import * as sinon from "sinon";

describe("createUserVideo", function () {
  it("should successfully save UserVideo to DB", function () {
    const userVideo = new UserVideo(
      "2183489",
      [new Tag("location", "vegas")],
      "388234"
    );

    const mockDynamoClient = sinon.fake.returns("test");

    console.log(mockDynamoClient());
    // mockDynamoClient.

    // createUserVideo(mockDynamoClient, userVideo);
  });
});
