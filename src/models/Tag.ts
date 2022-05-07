export const tagToDbTag = (tag: Tag): string => `tag#${tag.type}#${tag.value}`;

type TagType = "skill" | "industry" | "location" | "hours";
const VALID_TAG_TYPES = ["skill", "industry", "location", "hours"];

export class Tag {
  type: TagType;
  value: string;

  constructor(type: TagType, value: string) {
    this.type = type;
    this.value = value;
  }

  static parse(type: string, value: string): Tag {
    this.validate(type, value);
    return new Tag(type as any, value);
  }

  static validate(type: string, value: string): void {
    if (!type || type.trim().length === 0) throw "tag type is required";
    if (!value || value.trim().length === 0) throw "tag value is required";
    if (!VALID_TAG_TYPES.includes(type)) throw "invalid tag type";
  }
}
