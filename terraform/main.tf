terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket               = "videoproject-terraform"
    region               = "us-west-2"
    key                  = "videoproject.api"
    workspace_key_prefix = "videoproject.api"
  }
}

provider "aws" {
  region = var.aws_region
}

module "db" {
  source = "./modules/db"
}
