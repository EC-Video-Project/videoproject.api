export const tagToDbTag = (tag: Tag): string => `tag#${tag.type}#${tag.value}`;

export const dbTagToTag = (tag: string): Tag => {
  const parts = tag.split("#");
  return {
    type: parts[1] as any,
    value: parts[2],
  };
};

export type Tag = {
  type: "skill" | "industry" | "location" | "hours";
  value: string;
};
