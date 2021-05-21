terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
  access_key = "access_key"
  secret_key = "secret_key"
}

resource "aws_s3_bucket" "b" {
  bucket = "boilerplate-s3-storage"
  acl    = "private"

  versioning {
    enabled = true
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = ["http://localhost:4200"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

provider "heroku" {
  email   = "ops@company.com"
  api_key = "var.heroku_api_key"
}

resource "heroku_app" "default" {
  # ...
}
