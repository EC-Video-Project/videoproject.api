import { expect } from "chai";
import sinon from "sinon";
import { handler } from "src/api/endpoints/tag/get-tag";
import * as getAllTagsWrapper from "src/persistence/tag/getAllTags";
import { getPgClient } from "../../../../../src/persistence/pgFactory";

const DEFAULT_CONTEXT = {} as any;

const SUB = "140f73ec-d17e-41af-8e15-4e5e5e1a3fd9";
const BASE_REQUEST_BODY = {
  requestContext: {
    authorizer: {
      jwt: {
        claims: {
          sub: SUB,
        },
      },
    },
  },
} as any;

describe("GET /tag", function () {
  this.beforeEach(function () {
    sinon.replace(getAllTagsWrapper, "getAllTags", async () => {
      return;
    });
  });

  it("should return 200 with all tags", async function () {
    const client = await getPgClient();
    client.connect();
    const num_tags = await client.query('get count(*) from Tag;');

    const request = { ...BASE_REQUEST_BODY };
    const result = await handler(request, DEFAULT_CONTEXT);
    const body = JSON.parse(result.body);

    expect(result.statusCode).equal(201);
    expect(body.tags.length).equal(num_tags);
    expect(Object.keys(body.tag.first)).to.have.members(['id', 'type', 'name']);
  });
});
