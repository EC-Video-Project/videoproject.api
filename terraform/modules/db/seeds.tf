resource "random_uuid" "seed_id" {
}

resource "aws_dynamodb_table_item" "user1" {
  # table_name = resource_type.resource_name.name'
  # table_name = aws_dynamodb_table.table_partition_and_sort.name

  table_name = module.users_table.table_name
  hash_key   = module.users_table.partition_key_name

  item = <<ITEM
    {
    "userId": { "S": "user#${random_uuid.seed_id.result}" },
    "email": { "S": "example1@email.com" },
    "firstName": { "S": "Charis" },
    "lastName": { "S": "Ginn" },
    "profilePic": { "S": "somes3resource" },
    "socials": { "M": { "LinkedIn": {"S": "lskdjfsl"}, "PersonalWebsite": {"S": "sldjfs;jfsal;d"} } },
    "bio": { "S": "blah blah blah blah blah" },
    "starredPostings": { "L": [{"S": "postingid1"}, {"S": "postingid2"}] },
    "employerMode": { "BOOL": false }
  }
  ITEM
}