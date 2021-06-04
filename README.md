# Monorepo Starter

Production quality & field ready starter pack built to ship apps quick

🧰  NX - monorepo manager
🧰  Terraform - code-based infrastructure creation
🧰  Next.js - offers SSR, CSR, SSG, many other DX pros
🧰  NestJS - node.js backend built w/ typescript, DX/maintainability, GraphQL, etc. first class
🧰  Prisma - data access layer/orm-ish
🧰  GraphQL - data communication language
🧰  TailwindCSS - css utility library w/ superb DX
🧰  cypress/react-testing-library - testing utilities
🧰  @chaunceyau/react-components - tailwind based common ui elements

## Application Pieces
🖼️  *marketing-starter* - marketing/landing page for displaying product
  - runs on port 4201 by default
💻  *next-starter* - next.js frontend application & authentication
  - runs on port 4200 by default
📮  *api-starter* - nest.js graphql api
  - runs on port 5000 by default

## Starting from scratch
There are individual README files in each app directory as well. Complete both checklists to get application running.

1. Clone and rename .env.example files (there are multiple)
Rename each file just simply `.env` and then you will have to update some variables.

2. docker compose up
This will run all of the databases the application needs to run.

### Terraform setup
Terraform allows us to spin up infrastructure using code (main.tf file). running `terraform plan && terraform apply` will spin up our live servers.