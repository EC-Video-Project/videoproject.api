import mysql from "mysql2";
import { getSsmParameter } from "src/utilities/getSsmParameter";

let conn: mysql.Connection;

export const getMysqlConnection = async () => {
  if (!conn) {
    conn = mysql.createConnection({
      host: await getSsmParameter("db_url"),
      user: "admin",
      database: await getSsmParameter("db_name"),
      password: await getSsmParameter("db_adminPw", true),
      namedPlaceholders: true,
    });
  }

  return conn;
};
