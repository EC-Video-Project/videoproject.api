resource "aws_apigatewayv2_integration" "api_endpoint" {
  api_id = var.api_gw.id

  integration_uri  = aws_lambda_function.api_endpoint.invoke_arn
  integration_type = "AWS_PROXY"
}

resource "aws_apigatewayv2_route" "api_endpoint" {
  api_id             = var.api_gw.id
  route_key          = var.route_path
  target             = "integrations/${aws_apigatewayv2_integration.api_endpoint.id}"
  authorization_type = var.authorizer_id == "" ? "NONE" : "JWT"
  authorizer_id      = var.authorizer_id
}

resource "aws_lambda_permission" "api_gw_service_main" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_endpoint.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.api_gw.execution_arn}/*/*"
}

resource "aws_lambda_function" "api_endpoint" {
  function_name = var.lambda_name
  runtime       = "nodejs14.x"
  handler       = "src/${var.handler}"
  role          = var.lambda_exec_role_arn

  filename         = var.lambda_zip.output_path
  source_code_hash = var.lambda_zip.output_base64sha256
}
