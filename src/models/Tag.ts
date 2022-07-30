export const tagToDbTag = (tag: Tag): string => `tag#${tag.type}#${tag.name}`;

const VALID_TAG_TYPES = ["skill", "industry", "location", "hours", "pay"];
type TagType = (typeof VALID_TAG_TYPES)[number];

export class Tag {
  id: number;
  type: TagType;
  name: string;

  static new(data: { id: any, type: string, name: string }): Tag {
    const tag: Tag = {
      id: data.id,
      type: data.type as TagType,
      name: data.name,
    }

    this.validate(tag);
    
    return tag;
  }

  static validate(tag: Tag): void {
    if (!tag.name || tag.name.trim().length === 0) throw "tag name is required";
    if (!VALID_TAG_TYPES.includes(tag.type)) throw `${tag.type} is not a valid tag type`;
  }
}
