-- CreateEnum
CREATE TYPE "GlobalRole" AS ENUM ('OWNER', 'ADMIN', 'STANDARD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "GlobalRole"[];
