import { Tag } from "./Tag";
import { validate as uuidValidate } from 'uuid';

const VALID_INTRO_STATUSES = ['active', 'hidden', 'deleted'];
type IntroStatus = (typeof VALID_INTRO_STATUSES)[number];

export class Introduction {
  id: string;
  status: IntroStatus;
  videoId: string;
  userId: string;
  tags: Tag[] = [];
  createdDt: Date;
  updatedDt: Date;

  static new(data: Introduction): Introduction {
    const intro: Introduction = Object.assign({}, data, { createdDt: new Date(), updatedDt: new Date() });

    this.validate(intro);

    return intro;
  }

  static validate(intro: Introduction): void {
    if (!uuidValidate(intro.id)) throw `${intro.id} is not a valid introduction id`;
    if (!VALID_INTRO_STATUSES.includes(intro.status)) throw `${intro.status} is not a valid introduction status`;
    // validate real video by querying db
    // validate real user by querying db
    intro.tags.forEach((tag) => Tag.validate(tag));
  }
}