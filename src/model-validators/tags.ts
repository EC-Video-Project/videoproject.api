import { Tag } from "src/models/Tag";

export const VALID_TAG_TYPES = ["skill", "industry", "location", "hours"];

export const validateTag = ({ type, value }: Tag): void => {
  if (!type || type.trim().length === 0) throw "tag type is required";
  if (!value || value.trim().length === 0) throw "tag value is required";

  if (!VALID_TAG_TYPES.includes(type)) throw "invalid tag type";
};

export const validateTags = (tags: Tag[]): void => {
  tags.forEach((tag) => validateTag(tag));
};
