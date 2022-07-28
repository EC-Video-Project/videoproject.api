import { User } from "src/models/User";
import { getPgClient } from "../pgFactory";

export const createUser = async (user: User): Promise<void> => {
  const sql = `
    insert into AppUser
    ("id", "cognitoUsername", "displayName", "email", "phone", "employerMode", "bio", "profileLinks")
    values ($1, $2, $3, $4, $5, $6, $7, $8);`;

  const values = [
    user.id,
    user.cognitoUsername,
    user.displayName,
    user.email,
    user.phone,
    user.employerMode,
    user.bio,
    user.profileLinks,
  ];

  const client = await getPgClient();
  client.connect();

  try {
    const startTime = Date.now();

    const result = await client.query(sql, values);

    const queryTime = Date.now() - startTime;
    console.info(`createUser querytime ${queryTime}`);

    if (result.rowCount !== 1)
      throw {
        message: `creating user -- rowCount exptected to be 1, but was ${result.rowCount} instead.`,
        queryResult: result,
      };
  } catch (e) {
    if (
      typeof e.detail === "string" &&
      (e.detail as string).includes("already exists")
    ) {
      throw `userId ${user.id} already exists!`;
    } else {
      console.error(e);
      throw `error attempting to create user ${user.id}`;
    }
  } finally {
    client.end();
  }
};
