import { assert } from "chai";
import { Tag } from "src/models/Tag";

describe("Tag", function () {
  it("should be constructable", function () {
    const tag = new Tag("industry", "unit_testing");

    assert.equal(tag.type, "industry");
    assert.equal(tag.value, "unit_testing");
  });

  it("should be creatable from VALID string values", function () {
    assert.doesNotThrow(() => {
      const tag = Tag.parse("skill", "ping_pong");
      assert.equal(tag.type, "skill");
    });
  });

  it("should throw error when creating from INVALID values", function () {
    assert.throw(() => Tag.parse("invalidType", "asdf"));
  });

  it("should throw error on create with empty values", function () {
    assert.throw(() => {
      Tag.parse("", "stuff");
      Tag.parse("industry", "");
    });
  });
});
