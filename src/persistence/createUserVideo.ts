import { Introduction, IntroductionStatus } from "src/models/Introduction";
import mysql from "mysql2";
import { getSsmParameter } from "src/utilities/getSsmParameter";

export const createIntroduction = async (userVideo: Introduction) => {
  throw "Not IMplemented";
  const conn = mysql.createConnection({
    host: await getSsmParameter("db_url"),
    user: await getSsmParameter("admin"),
    database: await getSsmParameter("db_name"),
  });

  const sql = `
    insert into Introduction
        (itemStatus, videoId, userId)
    values
        (?, ?, ?)
    `;

  conn.execute(sql, [IntroductionStatus.Active, userVideo.userId]);
};
