resource "aws_cognito_user_pool" "userpool" {
  name = "main"
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_phone_number"
      priority = 1
    }
    recovery_mechanism {
      name     = "verified_email"
      priority = 2
    }
  }
  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = false
    require_uppercase                = true
    temporary_password_validity_days = 7
  }
  username_attributes = ["email", "phone_number"]
  username_configuration {
    case_sensitive = false
  }
}

resource "aws_cognito_user_pool_client" "client_devlocal" {
  name                                 = "DevLocal"
  user_pool_id                         = aws_cognito_user_pool.userpool.id
  access_token_validity                = 24
  id_token_validity                    = 24
  callback_urls                        = ["http://localhost:3000/authenticated"]
  logout_urls                          = ["http://localhost:3000/signedout"]
  allowed_oauth_flows                  = ["implicit", "code"]
  allowed_oauth_scopes                 = ["phone", "email", "openid", "profile"]
  enable_token_revocation              = true
  refresh_token_validity               = 3650
  supported_identity_providers         = ["COGNITO", aws_cognito_identity_provider.provider_google.provider_name, aws_cognito_identity_provider.provider_facebook.provider_name]
  prevent_user_existence_errors        = "ENABLED"
  allowed_oauth_flows_user_pool_client = true
  generate_secret                      = true
}

data "aws_ssm_parameter" "google_client_id" {
  name = "/cognito/google/clientId"
}

data "aws_ssm_parameter" "google_client_secret" {
  name = "/cognito/google/clientSecret"
}

resource "aws_cognito_identity_provider" "provider_google" {
  user_pool_id  = aws_cognito_user_pool.userpool.id
  provider_name = "Google"
  provider_type = "Google"
  provider_details = {
    authorize_scopes = "profile email openid"
    client_id        = data.aws_ssm_parameter.google_client_id.value
    client_secret    = data.aws_ssm_parameter.google_client_secret.value
    # this stuff comes from cognito -- adding it here so TF doesn't "detect" it everytime you run apply
    attributes_url                = "https://people.googleapis.com/v1/people/me?personFields="
    attributes_url_add_attributes = "true"
    authorize_url                 = "https://accounts.google.com/o/oauth2/v2/auth"
    oidc_issuer                   = "https://accounts.google.com"
    token_request_method          = "POST"
    token_url                     = "https://www.googleapis.com/oauth2/v4/token"
  }
  attribute_mapping = {
    email       = "email"
    name        = "name"
    picture     = "picture"
    given_name  = "given_name"
    family_name = "family_name"
    username    = "sub"
  }
}

data "aws_ssm_parameter" "facebook_client_id" {
  name = "/cognito/facebook/clientId"
}

data "aws_ssm_parameter" "facebook_client_secret" {
  name = "/cognito/facebook/clientSecret"
}

resource "aws_cognito_identity_provider" "provider_facebook" {
  user_pool_id  = aws_cognito_user_pool.userpool.id
  provider_name = "Facebook"
  provider_type = "Facebook"
  provider_details = {
    authorize_scopes = "public_profile,email"
    client_id        = data.aws_ssm_parameter.facebook_client_id.value
    client_secret    = data.aws_ssm_parameter.facebook_client_secret.value
    # this stuff comes from cognito -- adding it here so TF doesn't "detect" it everytime you run apply
    attributes_url                = "https://graph.facebook.com/v12.0/me?fields="
    attributes_url_add_attributes = "true"
    authorize_url                 = "https://www.facebook.com/v12.0/dialog/oauth"
    token_request_method          = "GET"
    token_url                     = "https://graph.facebook.com/v12.0/oauth/access_token"
  }
  attribute_mapping = {
    username    = "id"
    email       = "email"
    given_name  = "first_name"
    family_name = "last_name"
    name        = "name"
  }
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = var.cognito_domain
  user_pool_id = aws_cognito_user_pool.userpool.id
}

resource "aws_ssm_parameter" "auth_issuer_url" {
  name  = "/cognito/issuerUrl"
  type  = "String"
  value = "https://${aws_cognito_user_pool.userpool.endpoint}"
}

resource "aws_ssm_parameter" "auth_audience_devlocal" {
  name  = "/cognito/audience/devlocal"
  type  = "String"
  value = aws_cognito_user_pool_client.client_devlocal.id
}
