variable "table_name" {
  description = "The name of the table being created. Plural, lower case"
  type        = string
}

variable "partition_key_name" {
  description = "The name of the partition/hash key. Camelcase"
  type = string
}

variable "sort_key_name" {
  description = "The name of the sort/range key. Camelcase"
  type = string 
}

# add variables for gsis, tags?