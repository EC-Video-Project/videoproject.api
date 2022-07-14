export const tagToDbTag = (tag: Tag): string => `tag#${tag.type}#${tag.value}`;

type TagType = "skill" | "industry" | "location" | "hours";
const VALID_TAG_TYPES = ["skill", "industry", "location", "hours"];

export class Tag {
  id: number;
  type: TagType;
  value: string;

  constructor(id: number, type: TagType, value: string) {
    this.id = id;
    this.type = type;
    this.value = value;
  }

  static parse(id: number, type: string, value: string): Tag {
    this.validate(id, type, value);
    return new Tag(id, type as any, value);
  }

  static validate(id: number, type: string, value: string): void {
    if (!id || id < 0) throw "invalid tag id";
    if (!type || type.trim().length === 0) throw "tag type is required";
    if (!value || value.trim().length === 0) throw "tag value is required";
    if (!VALID_TAG_TYPES.includes(type)) throw "invalid tag type";
  }
}
