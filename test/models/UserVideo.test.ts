import { assert } from "chai";
import { Tag } from "src/models/Tag";
import { UserVideo } from "src/models/UserVideo";

describe("UserVideo", function () {
  it("should be constructable", function () {
    const tags = [new Tag("location", "spokane")];
    const userVideo = new UserVideo("someId", tags, "someUserId");

    assert.equal(userVideo.id, "someId");
    assert.includeMembers(userVideo.tags, tags);
    assert.equal(userVideo.userId, "someUserId");
  });

  it("should not allow empty or whitespace strings in constructor", function () {
    assert.throw(() => new UserVideo(" ", [], " "));

    assert.throw(() => new UserVideo("", [], ""));
  });

  it("should default to empty collection of tags if none provided", function () {
    const userVideoTagsUndefined = new UserVideo("someid", undefined, "userId");
    assert.isArray(userVideoTagsUndefined.tags);
    assert.equal(userVideoTagsUndefined.tags.length, 0);

    const userVideoEmptyTags = new UserVideo("someid", [], "userid");
    assert.isArray(userVideoEmptyTags.tags);
    assert.equal(userVideoEmptyTags.tags.length, 0);
  });
});
