resource "random_password" "main_db_pw" {
  length           = 16
  special          = true
  override_special = "_!%^"
}

resource "aws_ssm_parameter" "main_db_pw" {
  name  = "/db/adminPw"
  type  = "SecureString"
  value = random_password.main_db_pw.result
}

resource "aws_db_instance" "main_db" {
  engine                              = "mysql"
  engine_version                      = "8.0.28"
  instance_class                      = "db.t4g.micro"
  identifier                          = "main"
  username                            = "admin"
  password                            = aws_ssm_parameter.main_db_pw.value
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

resource "aws_ssm_parameter" "main_db_url" {
  name  = "/db/url"
  type  = "String"
  value = aws_db_instance.main_db.address
}
