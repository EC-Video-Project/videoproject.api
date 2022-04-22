locals {
  videos_tags_pk     = "PK"
  videos_tags_sk     = "SK"
  videos_tags_userId = "userId"
}

resource "aws_dynamodb_table" "videos_and_tags" {
  name         = "VideosTags"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = local.videos_tags_pk
  range_key = local.videos_tags_sk

  attribute {
    name = local.videos_tags_pk
    type = "S"
  }

  attribute {
    name = local.videos_tags_sk
    type = "S"
  }

  attribute {
    name = local.videos_tags_userId
    type = "S"
  }

  global_secondary_index {
    name            = "userId"
    hash_key        = local.videos_tags_userId
    range_key       = local.videos_tags_sk
    projection_type = "ALL"
  }
}
