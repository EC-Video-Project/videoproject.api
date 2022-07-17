import { User } from "src/models/User";
import { getMysqlConnection } from "../mysqlFactory";

export const createUser = async (user: User, authId: string) => {
  const conn = await getMysqlConnection();

  const sql = `
  insert into User
  (authId,  displayName,  email,  phone,  employerMode,  bio,  profileLinks)
  values
  (:authId, :displayName, :email, :phone, :employerMode, :bio, :profileLinks);
  `;

  conn.execute(sql, { ...user, authId });

  const onComplete = function (err, results, fields) {
    console.log(results);
  };

  conn.query("select LAST_INSERT_ID() as id;", onComplete);

  conn.end();
};
