resource "aws_apigatewayv2_api" "videoproj" {
  name          = "videoproj"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "videoproj" {
  api_id      = aws_apigatewayv2_api.videoproj.id
  name        = "videoproj"
  auto_deploy = true
}

resource "aws_iam_role" "lambda_base_exec" {
  name = "${aws_apigatewayv2_api.videoproj.name}_lambdaapi_base_exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_base_policy" {
  role       = aws_iam_role.lambda_base_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_ssm_parameter" "api_url" {
  name  = "/videoproj/apiUrl"
  type  = "String"
  value = aws_apigatewayv2_stage.videoproj.invoke_url
}

resource "aws_apigatewayv2_authorizer" "cognito_auth" {
  api_id           = aws_apigatewayv2_api.videoproj.id
  authorizer_type  = "JWT"
  name             = "CognitoAuthorizer"
  identity_sources = ["$request.header.Authorization"]
  jwt_configuration {
    audience = var.jwt_audiences
    issuer   = var.jwt_issuer
  }
}
