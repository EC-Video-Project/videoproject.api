import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
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

      return Tag.parse(tagParts[0], tagParts[1]);
    });
  }

  return tags;
};
