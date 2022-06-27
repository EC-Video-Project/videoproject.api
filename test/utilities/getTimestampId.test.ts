import { expect } from "chai";
import { getTimestampId, timestampIdRegex } from "src/utilities/getTimestampId";

describe("getTimestampId", function () {
  it("should return a valid timestamp ID", function () {
    const timestampId = getTimestampId();

    expect(timestampId).length(19);
    expect(timestampId).match(timestampIdRegex);
  });

  it("should include a recent & valid epoch time as start of id", function () {
    const timestampId = getTimestampId();
    const timestampNow = parseInt(timestampId.substring(0, 13));

    const now = Date.now();

    const difference = now - timestampNow;

    // Validate timestamp is within the last 5 seconds
    expect(difference).to.be.lessThanOrEqual(5000);
  });
});
