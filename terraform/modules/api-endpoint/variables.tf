variable "api_gw" {
  description = "ID of api this endpoint is associated with"
  type = object({
    id            = string
    execution_arn = string
    name          = string
  })
}

variable "route_path" {
  description = "url route of the endpoint. must be unique"
  type        = string
}

variable "lambda_exec_role_arn" {
  description = "IAM Role ARN for execution of the lambda for this endpoint"
  type        = string
}

variable "lambda_name" {
  description = "Name of the lambda function"
  type        = string
}

variable "authorizer_id" {
  description = "Optional. ID of api gateway authorizer to use for this endpoint"
  type        = string
  default     = ""
}

variable "lambda_zip" {
  description = "Zip file containing source code for lambda"
  type = object({
    output_path         = string
    output_base64sha256 = string
  })
}

variable "handler" {
  description = "path to js module including handler function"
  type        = string
}
