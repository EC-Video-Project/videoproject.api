import { Tag } from "./Tag";

export class UserVideo {
  id: string = "";
  tags: Tag[] = [];
  userId: string = "";

  constructor(id: string = "", tags: Tag[], userId: string = "") {
    if (!id.trim()) throw "id is required";
    if (!userId.trim()) throw "userId is required";

    this.id = id;
    this.tags = tags ?? []; // tags can be empty
    this.userId = userId;
  }
}
