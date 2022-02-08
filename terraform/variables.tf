variable "aws_region" {
  description = "AWS Region for all the resources"
  type        = string
  default     = "us-west-2"
}

variable "cognito_domain" {
  description = "Prefix for aws managed domain name"
  type        = string
  default     = "videoproject-dev2"
}
