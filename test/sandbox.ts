// put code in here that you want to run

import { Client } from "pg";
import { getSsmParameter } from "src/utilities/getSsmParameter";

it("should work", async function () {
  console.log("starting");

  const client = new Client({
    user: await getSsmParameter("db_adminUsername"),
    host: await getSsmParameter("db_url"),
    database: "postgres",
    password: await getSsmParameter("db_adminPw", true),
  });
  await client.connect();
  const res = await client.query("select * from appuser;");
  console.log(res.rows); // Hello world!
  console.log(res.rows[0].displayname);
  console.log(res.rows[0].displayName);
  console.log("hello world");
  await client.end();
});
