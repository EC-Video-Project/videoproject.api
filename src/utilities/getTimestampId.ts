import { nanoid } from "nanoid";

export const timestampIdRegex = /^\d{13}-[A-Za-z0-9_-]{5}$/;

export const getTimestampId = (): string => {
  return `${Date.now()}-${nanoid(5)}`;
};
