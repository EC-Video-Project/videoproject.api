import { Tag } from "./Tag";

export enum IntroductionStatus {
  Active = 0,
  Hidden = 1,
  Deleted = 2,
}

export class Introduction {
  id: number;
  itemStatus: IntroductionStatus;
  videoId: string;
  userId: number;
  tags: Tag[] = [];
  createdDt: Date;
  updatedDt: Date;
}
