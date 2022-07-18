resource "random_password" "main_db_pw" {
  length           = 16
  special          = true
  override_special = "_!%^"
}

resource "aws_ssm_parameter" "db_adminPw" {
  name  = "db_adminPw"
  type  = "SecureString"
  value = random_password.main_db_pw.result
}

resource "aws_ssm_parameter" "db_adminUsername" {
  name  = "db_adminUsername"
  type  = "String"
  value = "cnadmin"
}

resource "aws_db_instance" "main_db" {
  engine                              = "postgres"
  engine_version                      = "14.2"
  instance_class                      = "db.t4g.micro"
  identifier                          = "main"
  username                            = aws_ssm_parameter.db_adminUsername.value
  password                            = aws_ssm_parameter.db_adminPw.value
  skip_final_snapshot                 = true
  allocated_storage                   = 20
  max_allocated_storage               = 150
  auto_minor_version_upgrade          = true
  iam_database_authentication_enabled = true
  monitoring_interval                 = 0
  multi_az                            = false
  publicly_accessible                 = true
  storage_encrypted                   = true
  vpc_security_group_ids              = ["sg-07b34e3060db9fc89"] # hard coded to existing sg id for now...
  # parameter_group_name = ""
  # deletion_protection = true
}

resource "aws_ssm_parameter" "db_url" {
  name  = "db_url"
  type  = "String"
  value = aws_db_instance.main_db.address
}

resource "aws_ssm_parameter" "db_name" {
  name  = "db_name"
  type  = "String"
  value = "codename-${var.environment}"
}
