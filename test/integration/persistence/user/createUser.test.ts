import { User } from "src/models/User";
import { createUser } from "src/persistence/user/createUser";

describe("createUser", function () {
  it("should be creatable with all valid values", async function () {
    const authId = "asdf-1234";
    const user = User.new({
      displayName: "ben dover",
      email: "bendover@example.com",
      phone: "+15092342342",
      employerMode: false,
      bio: "people tease me cause of my name",
      profileLinks: [],
    });

    await createUser(user, authId);
  });
});
