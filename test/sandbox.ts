// put code in here that you want to run

import { getSsmParameter } from "src/utilities/getSsmParameter";

const execute = async () => {
  console.log("asdifunadisufaoisudgfausdgfkjasdf");
  const result = await getSsmParameter("db_name");
  console.log(result);
};

execute();
