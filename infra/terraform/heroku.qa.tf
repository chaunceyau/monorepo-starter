provider "heroku" {
  email   = "ops@company.com"
  api_key = "var.heroku_api_key"
}

data "heroku_team" "my_app_team" {
  name = "my_app_team"
}

resource "heroku_app" "pi" {
  name = "dev-api-starter"
  organization = var.heroku_team.my_app_team
}

resource "heroku_addon" "database" {
  app  = heroku_app.api.name
  plan = "heroku-postgresql:hobby-dev"
}
