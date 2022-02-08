variable "jwt_issuer" {
  description = "Issuer URL for jwt auth validation"
  type        = string
}

variable "jwt_audiences" {
  description = "List of strings of valid audiences for jwt auth"
  type        = list(string)
}
