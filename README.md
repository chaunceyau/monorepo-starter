# Monorepo Starter

Production quality & field ready starter pack built to ship apps quick

- NX - monorepo manager
- Terraform - code-based infrastructure creation
- Next.js - offers SSR, CSR, SSG, many other DX pros
- NestJS - node.js backend built w/ typescript, DX/maintainability, GraphQL, etc. first class
- Prisma - data access layer/orm-ish
- GraphQL - data communication language
- TailwindCSS - css utility library w/ superb DX
- cypress/react-testing-library - testing utilities
- @chaunceyau/react-components - tailwind based common ui elements

# Getting configured

1. Clone and rename .env.example files (there are multiple)
Rename each file just simply `.env` and then you will have to update some variables.

### next-starter/.env
- configure google oauth
  vars: GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET
- setup stripe
  vars: STRIPE_SECRET_KEY

2. docker compose up
This will run all of the databases the application needs to run.

### Terraform setup
Terraform allows us to spin up infrastructure using code (main.tf file). running `terraform plan && terraform apply` will spin up our live servers.