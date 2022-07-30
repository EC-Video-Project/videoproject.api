import { getPgClient } from "../pgFactory";

export const getAllTags = async (): Promise<void> => {
  const client = await getPgClient();
  client.connect();

  try {
    const startTime = Date.now();
    await client.query('get * from Tag;');
    const queryTime = Date.now() - startTime;
    console.info(`getAllTags querytime ${queryTime}`);
  } catch (e) {
    console.error(e);
    throw 'error attempting to get tags';
  } finally {
    client.end();
  }
};