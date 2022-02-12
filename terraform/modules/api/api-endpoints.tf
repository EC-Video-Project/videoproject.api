module "endpoint_test" {
  source = "../api-endpoint/"

  route_path           = "GET /test"
  lambda_name          = "api-endpoint-hello"
  handler              = "api/get-test.handler"
  authorizer_id        = aws_apigatewayv2_authorizer.cognito_auth.id
  lambda_exec_role_arn = aws_iam_role.lambda_base_exec.arn
  api_gw               = aws_apigatewayv2_api.videoproj
  lambda_zip           = data.archive_file.lambda_zip # find a way to remove this as a prop?? data source that can be hard-coded to the bin director?
}

module "endpoint_get_user_settings" {
  source = "../api-endpoint/"

  route_path           = "GET /user/{userId}"
  lambda_name          = "api-endpoint-get-user-settings"
  handler              = "api/get-user-settings.handler"
  authorizer_id        = aws_apigatewayv2_authorizer.cognito_auth.id
  lambda_exec_role_arn = aws_iam_role.lambda_base_exec.arn
  api_gw               = aws_apigatewayv2_api.videoproj
  lambda_zip           = data.archive_file.lambda_zip # Look into moving this to S3, so that it's only uploaded once, instead of once per lambda
}
