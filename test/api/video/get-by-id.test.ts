import { assert, expect } from "chai";
import { handler } from "src/api/video/get-by-id";

const DEFAULT_CONTEXT = {} as any; // replace with sinon mock?

describe("video/get-by-id", function () {
  it("should return 200 with presigned url", async function () {
    const request = {
      pathParameters: { videoId: "2222222222222-abcde" },
    } as any;

    const result = await handler(request, DEFAULT_CONTEXT);

    expect(result.statusCode).equal(200);

    const body = JSON.parse(result.body);
    expect(body.fileId).to.equal(request.pathParameters.videoId);
    assert.isTrue(body.url.startsWith("https://"));
    assert.isTrue(body.url.includes("amazonaws.com"));
  });

  it("should return error when missing videoId parameter", async function () {
    const request = { pathParameters: {} } as any;

    const result = await handler(request, DEFAULT_CONTEXT);

    expect(result.statusCode).equal(400);
  });
});
