  # standard user attributes: 
  #   userId (S)
  #   email (S)
  #   firstName (S)
  #   lastName (S)
  #   profilePic (S)
  #   socials (M)
  #   bio (S)
  #   starredPostings (SS)
  #   employerMode (B)

resource "aws_dynamodb_table" "table_partition_only" {
  count = var.sort_key_name == null ? 1 : 0
  name           = var.table_name
  billing_mode   = "PROVISIONED"
  read_capacity  = 5 # per second
  write_capacity = 5 
  hash_key       = var.partition_key_name

  attribute {
    name = var.partition_key_name
    type = "S"
  }

  # gsi, tags
}

resource "aws_dynamodb_table" "table_partition_and_sort" {
  count = var.sort_key_name == null ? 0 : 1
  name           = var.table_name
  billing_mode   = "PROVISIONED"
  read_capacity  = 5 # per second
  write_capacity = 5 
  hash_key       = var.partition_key_name
  range_key      = var.sort_key_name

  attribute {
    name = var.partition_key_name
    type = "S"
  }

  attribute {
    name = var.sort_key_name
    type = "S"
  }

  # gsi, tags
}

output "table_name" {
  value = var.table_name
}

output "partition_key_name" {
  value = var.partition_key_name
}