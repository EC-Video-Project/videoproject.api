import { expect } from "chai";
import { handler } from "src/api/endpoints/user/post";

const DEFAULT_CONTEXT = {} as any;

describe("POST /user", function () {
  it("should return 200 with profile details", async function () {
    const request = {
      body: {
        email: "someemail@adsf.com",
        phoneNumber: "15098675309",
        displayName: "Mister Meeseeks",
        links: [
          { type: "linkedin", url: "https://linked.in/userprofile" },
          { type: "www", url: "https://my.website" },
        ],
        bio: "i'm mr. meeseeks! look at me!",
        employerMode: false,
      },
    } as any;

    const result = await handler(request, DEFAULT_CONTEXT);

    const body = JSON.parse(result.body);

    expect(result.statusCode).equal(201);

    expect(body).has.property("userId");
    expect(body.email).equal(request.body.email);
    expect(body.phoneNumber).equal(request.body.phoneNumber);
    expect(body.displayName).equal(request.body.displayName);
    expect(body.bio).equal(request.body.bio);
    expect(body.employerMode).equal(false);
    expect(body.links).to.include(request.body.links[0]);
    expect(body.links).to.include(request.body.links[1]);
  });
});
