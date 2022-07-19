import { expect } from "chai";
import { User } from "src/models/User";
import { createUser } from "src/persistence/user/createUser";
import { v4 as uuidv4 } from "uuid";

const SAMPLE_USER = User.new({
  id: uuidv4(),
  cognitoUsername: "someUsername-234235",
  displayName: "ben dover",
  email: "bendover@example.com",
  phone: "+15092342342",
  employerMode: false,
  bio: "people tease me cause of my name",
  profileLinks: [],
});

describe("createUser", function () {
  it("should be creatable with all valid values", async function () {
    await createUser(SAMPLE_USER);
  });

  it("cannot create users with duplicate id", async function () {
    await createUser(SAMPLE_USER);
    expect(await createUser(SAMPLE_USER)).to.throw();
  });
});
