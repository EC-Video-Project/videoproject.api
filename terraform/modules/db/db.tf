module "users_table" {
  source             = "./table/"

  table_name         = "users"
  partition_key_name = "userId"
  sort_key_name      = null
}

module "postings_tags_table" {
  source             = "./table/"

  table_name         = "postings-tags"
  partition_key_name = "partitionId"
  sort_key_name      = "sortId"
}