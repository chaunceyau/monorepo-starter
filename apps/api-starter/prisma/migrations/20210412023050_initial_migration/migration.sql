-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE_TIER', 'PREMIUM_SUBSCRIBER', 'ENTERPRISE_SUBSCRIBER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "subscription_type" "SubscriptionType",
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "current_period_end" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.stripe_customer_id_unique" ON "User"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "User.stripe_subscription_id_unique" ON "User"("stripe_subscription_id");
