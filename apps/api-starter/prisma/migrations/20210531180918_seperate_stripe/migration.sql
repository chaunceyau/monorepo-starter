/*
  Warnings:

  - You are about to drop the column `current_period_end` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_type` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_sync_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User.stripe_customer_id_unique";

-- DropIndex
DROP INDEX "User.stripe_subscription_id_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "current_period_end",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "stripe_subscription_id",
DROP COLUMN "subscription_type",
ADD COLUMN     "stripe_sync_id" TEXT;

-- CreateTable
CREATE TABLE "UserNotification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeSync" (
    "id" TEXT NOT NULL,
    "subscription_type" "SubscriptionType",
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "current_period_end" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_sync_id_unique" ON "User"("stripe_sync_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeSync.stripe_customer_id_unique" ON "StripeSync"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeSync.stripe_subscription_id_unique" ON "StripeSync"("stripe_subscription_id");

-- AddForeignKey
ALTER TABLE "UserNotification" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("stripe_sync_id") REFERENCES "StripeSync"("id") ON DELETE SET NULL ON UPDATE CASCADE;
