module "endpoint_test" {
  source = "../api-endpoint/"

  route_path           = "GET /test"
  lambda_name          = "api-endpoint-hello"
  api_gw               = aws_apigatewayv2_api.videoproj
  lambda_exec_role_arn = aws_iam_role.lambda_base_exec.arn
  authorizer_id        = aws_apigatewayv2_authorizer.cognito_auth.id
  source_path          = "${path.root}/../src/api/get-test/"
}
