import { nanoid } from "nanoid";

export const getTimestampId = (): string => {
  return `${Date.now()}-${nanoid(8)}`;
};
