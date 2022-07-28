import { assert, expect } from "chai";
import sinon from "sinon";
import { handler } from "src/api/endpoints/user/post";
import * as createUser from "src/persistence/user/createUser";
import { validate as validateUUID } from "uuid";

const DEFAULT_CONTEXT = {} as any;

const SUB = "140f73ec-d17e-41af-8e15-4e5e5e1a3fd9";
const BASE_REQUEST_BODY = {
  body: {
    displayName: "Mister Meeseeks",
    email: "someemail@adsf.com",
    phone: "+15098675309",
    employerMode: false,
    bio: "i'm mr. meeseeks! look at me!",
    profileLinks: [
      { type: "linkedin", url: "https://linked.in/userprofile" },
      { type: "www", url: "https://my.website" },
    ],
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

describe("POST /user", function () {
  this.beforeEach(function () {
    sinon.replace(createUser, "createUser", async () => {});
  });

  it("should return 200 with profile details", async function () {
    const request = { ...BASE_REQUEST_BODY };

    const result = await handler(request, DEFAULT_CONTEXT);
    const body = JSON.parse(result.body);

    expect(result.statusCode).equal(201);
    assert.isTrue(validateUUID(body.user.id));
    expect(body.user.id).equal(SUB);
    expect(body.user.email).equal(BASE_REQUEST_BODY.body.email);
    expect(body.user.phone).equal(BASE_REQUEST_BODY.body.phone);
    expect(body.user.displayName).equal(BASE_REQUEST_BODY.body.displayName);
    expect(body.user.bio).equal(BASE_REQUEST_BODY.body.bio);
    expect(body.user.employerMode).equal(false);
    expect(body.user.profileLinks).length(2);

    const resultLinkUrls = body.user.profileLinks.map((x) => x.url);
    expect(resultLinkUrls).to.include(
      BASE_REQUEST_BODY.body.profileLinks[0].url
    );
    expect(resultLinkUrls).to.include(
      BASE_REQUEST_BODY.body.profileLinks[1].url
    );
  });

  it("should not require optional field profileLinks", async function () {
    const request = { ...BASE_REQUEST_BODY };
    delete request.body.profileLinks;
    delete request.body.bio;

    const result = await handler(request, DEFAULT_CONTEXT);
    const body = JSON.parse(result.body);

    expect(result.statusCode).equal(201);
    assert.isTrue(validateUUID(body.user.id));
    expect(body.user.id).equal(SUB);
    expect(body.user.displayName).equal(BASE_REQUEST_BODY.body.displayName);
  });

  it("should return 400 when missing displayName", async function () {
    const request = { ...BASE_REQUEST_BODY };
    delete request.body.displayName;
    const result = await handler(request, DEFAULT_CONTEXT);
    expect(result.statusCode).equal(400);
  });

  it("should return 400 when missing email", async function () {
    const request = { ...BASE_REQUEST_BODY };
    delete request.body.email;
    const result = await handler(request, DEFAULT_CONTEXT);
    expect(result.statusCode).equal(400);
  });

  it("should return 400 when missing phone", async function () {
    const request = { ...BASE_REQUEST_BODY };
    delete request.body.phone;
    const result = await handler(request, DEFAULT_CONTEXT);
    expect(result.statusCode).equal(400);
  });

  it("should return 400 when missing employerMode", async function () {
    const request = { ...BASE_REQUEST_BODY };
    delete request.body.employerMode;
    const result = await handler(request, DEFAULT_CONTEXT);
    expect(result.statusCode).equal(400);
  });
});
