import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { validateTag } from "src/model-validators/tags";
import { Tag } from "src/models/Tag";
import httpError from "./httpError";

export const parseTagsFromQueryString = (
  queryString: APIGatewayProxyEventQueryStringParameters
): Tag[] => {
  let tags: Tag[] = [];

  if (queryString && queryString.tags) {
    tags = queryString.tags.split(",").map((tag) => {
      const tagParts = tag.split("#");

      if (tagParts.length !== 2)
        throw new httpError.BadRequest(`Tag malformed: ${tag}`);

      const newTag: Tag = { type: tagParts[0] as any, value: tagParts[1] };
      validateTag(newTag);

      return newTag;
    });
  }

  return tags;
};
