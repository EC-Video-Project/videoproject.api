import { Client } from "pg";
import { getSsmParameter } from "src/utilities/getSsmParameter";

let conn: Client;

export const getPgConnection = async (): Promise<Client> => {
  if (!conn)
    conn = new Client({
      user: await getSsmParameter("db_adminUsername"),
      host: await getSsmParameter("db_url"),
      database: "postgres",
      password: await getSsmParameter("db_adminPw", true),
    });

  return conn;
};
