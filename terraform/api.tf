# Supporting resources for the Serverless Framework API

resource "aws_iam_role" "serverless_lambda" {
  name = "serverless_api_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "serverless_lambda_basic_exec" {
  role       = aws_iam_role.serverless_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Serverless framework will read this parameter, and use the value
# for all lambdas that make up the API
resource "aws_ssm_parameter" "serverless_lambda" {
  name  = "/api/lambdaExecutionRole"
  type  = "String"
  value = aws_iam_role.serverless_lambda.arn
}
