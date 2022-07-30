import { Tag } from "src/models/Tag";
import { getPgClient } from "../pgFactory";

export const createTag = async (tag: Tag) => {
  const READ_ONLY_TAG_TYPES = ['hours', 'pay'];
  const sql = `insert into Tag ("name", "type") values ($1, $2);`;
  const values = [tag.name, tag.type];

  if (READ_ONLY_TAG_TYPES.includes(tag.type)) throw `cannot create tag of type ${tag.type}`;

  const client = await getPgClient();
  client.connect();

  try {
    const startTime = Date.now();
    const result = await client.query(sql, values);
    const queryTime = Date.now() - startTime;
    console.info(`createTag querytime ${queryTime}`);

    if (result.rowCount !== 1)
      throw {
        message: `creating tag -- rowCount exptected to be 1, but was ${result.rowCount} instead.`,
        queryResult: result,
      };
  } catch (e) {
    if (
      typeof e.detail === "string" &&
      (e.detail as string).includes("already exists")
    ) {
      throw `tag with name ${tag.name} already exists!`;
    } else {
      console.error(e);
      throw `error attempting to create tag ${tag.name}`;
    }
  } finally {
    client.end();
  }
};
