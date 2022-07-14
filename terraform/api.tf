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

resource "aws_iam_role_policy_attachment" "severless_lambda_dynamodb_full" {
  role       = aws_iam_role.serverless_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_policy" "serverless_lambda_exec" {
  name        = "serverless_api_lambda"
  description = "required permissions for things accessed by sls api"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Action : [
          "ssm:GetParameter"
        ],
        Effect : "Allow",
        Resource : "*"
      },
      {
        Action : [
          "s3:PutObject",
          "s3:GetObject"
        ],
        Effect : "Allow",
        Resource : "${aws_s3_bucket.video_storage.arn}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "serverless_lambda" {
  role       = aws_iam_role.serverless_lambda.name
  policy_arn = aws_iam_policy.serverless_lambda_exec.arn
}

# Serverless framework will read this parameter, and use the value
# for all lambdas that make up the API
resource "aws_ssm_parameter" "api_lambdaExecutionRole" {
  name  = "api_lambdaExecutionRole"
  type  = "String"
  value = aws_iam_role.serverless_lambda.arn
}
