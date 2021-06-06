/*
  Warnings:

  - A unique constraint covering the columns `[related_user_id]` on the table `StripeSync` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StripeSync" ADD COLUMN     "related_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "StripeSync.related_user_id_unique" ON "StripeSync"("related_user_id");
