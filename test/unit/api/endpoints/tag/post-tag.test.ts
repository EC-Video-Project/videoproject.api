import { expect } from "chai";
import sinon from "sinon";
import { handler } from "src/api/endpoints/tag/post-tag";
import * as createTagWrapper from "src/persistence/tag/createTag";

const DEFAULT_CONTEXT = {} as any;

const SUB = "140f73ec-d17e-41af-8e15-4e5e5e1a3fd9";
const BASE_REQUEST_BODY = {
  body: {
    id: -1,
    type: 'location',
    name: 'Atlanta, GA',
  },
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

describe("POST /tag", function () {
  this.beforeEach(function () {
    sinon.replace(createTagWrapper, "createTag", async () => {
      return;
    });
  });

  it("should return 200 with tag attributes and id", async function () {
    const request = { ...BASE_REQUEST_BODY };
    const result = await handler(request, DEFAULT_CONTEXT);
    const body = JSON.parse(result.body);

    expect(result.statusCode).equal(201);
    expect(body.tag.type).equal(BASE_REQUEST_BODY.body.type);
    expect(body.tag.name).equal(BASE_REQUEST_BODY.body.name);
    expect(body.tag.id).to.be.greaterThan(0);
  });

  it("should return 400 when missing type", async function () {
    const request = { ...BASE_REQUEST_BODY };
    delete request.body.type;
    const result = await handler(request, DEFAULT_CONTEXT);
    expect(result.statusCode).equal(400);
  });

  it("should return 400 when missing name", async function () {
    const request = { ...BASE_REQUEST_BODY };
    delete request.body.name;
    const result = await handler(request, DEFAULT_CONTEXT);
    expect(result.statusCode).equal(400);
  });
});
