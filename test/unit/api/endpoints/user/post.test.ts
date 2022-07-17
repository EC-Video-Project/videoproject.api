import { expect } from "chai";
import { handler } from "src/api/endpoints/user/post";

const DEFAULT_CONTEXT = {} as any;

describe("POST /user", function () {
  it("should return 200 with profile details", async function () {
    const request = {
      body: {
        displayName: "Mister Meeseeks",
        email: "someemail@adsf.com",
        phone: "15098675309",
        employerMode: false,
        bio: "i'm mr. meeseeks! look at me!",
        profileLinks: [
          { type: "linkedin", url: "https://linked.in/userprofile" },
          { type: "www", url: "https://my.website" },
        ],
      },
    } as any;

    const result = await handler(request, DEFAULT_CONTEXT);

    const body = JSON.parse(result.body);

    expect(result.statusCode).equal(201);

    expect(body).has.property("id");
    expect(body.email).equal(request.body.email);
    expect(body.phone).equal(request.body.phone);
    expect(body.displayName).equal(request.body.displayName);
    expect(body.bio).equal(request.body.bio);
    expect(body.employerMode).equal(false);
    expect(body.links).to.include(request.body.links[0]);
    expect(body.links).to.include(request.body.links[1]);
  });

  it("should not require optional field profileLinks", async function () {
    const request = {
      body: {
        displayName: "Mister Meeseeks",
        email: "someemail@adsf.com",
        phone: "15098675309",
        employerMode: false,
        bio: "i'm mr. meeseeks! look at me!",
      },
    } as any;

    const result = await handler(request, DEFAULT_CONTEXT);

    const body = JSON.parse(result.body);

    expect(result.statusCode).equal(201);
    expect(body).has.property("id");
    expect(body.displayName).to.equal(request.body.displayName);
  });

  it("should return 400 when missing displayName", async function () {
    const request = {
      body: {
        email: "someemail@adsf.com",
        phone: "15098675309",
        employerMode: false,
        bio: "i'm mr. meeseeks! look at me!",
      },
    } as any;

    const result = await handler(request, DEFAULT_CONTEXT);

    expect(result.statusCode).equal(400);

    expect(result.body).to.include("displayName");
  });
});
