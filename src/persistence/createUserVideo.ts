import { Introduction, IntroductionStatus } from "src/models/Introduction";
import { getSsmParameter } from "src/utilities/getSsmParameter";

export const createIntroduction = async (userVideo: Introduction) => {
  throw "Not IMplemented";

  const sql = `
    insert into Introduction
        (itemStatus, videoId, userId)
    values
        (?, ?, ?)
    `;
};
