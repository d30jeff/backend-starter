/*
  Warnings:

  - You are about to drop the column `phone` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the `ConsumerProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[type,email]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[plan]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordHash` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConsumerProfile" DROP CONSTRAINT "ConsumerProfile_consumerID_fkey";

-- DropIndex
DROP INDEX "Consumer_ID_email_phone_idx";

-- DropIndex
DROP INDEX "Consumer_email_key";

-- DropIndex
DROP INDEX "Consumer_phone_key";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "phone",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "plan" TEXT NOT NULL;

-- DropTable
DROP TABLE "ConsumerProfile";

-- DropTable
DROP TABLE "Membership";

-- CreateTable
CREATE TABLE "Profile" (
    "ID" TEXT NOT NULL,
    "fullName" TEXT,
    "nric" TEXT,
    "gender" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "consumerID" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Preference" (
    "ID" TEXT NOT NULL,
    "consumerID" TEXT NOT NULL,
    "appearance" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "allowPushNotification" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "MembershipCard" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "MembershipCard_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Outlet" (
    "ID" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_consumerID_key" ON "Profile"("consumerID");

-- CreateIndex
CREATE INDEX "Profile_ID_consumerID_idx" ON "Profile"("ID", "consumerID");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_consumerID_key" ON "Preference"("consumerID");

-- CreateIndex
CREATE INDEX "Preference_ID_consumerID_allowPushNotification_createdAt_idx" ON "Preference"("ID", "consumerID", "allowPushNotification", "createdAt");

-- CreateIndex
CREATE INDEX "MembershipCard_ID_type_code_idx" ON "MembershipCard"("ID", "type", "code");

-- CreateIndex
CREATE INDEX "Consumer_ID_type_email_createdAt_updatedAt_idx" ON "Consumer"("ID", "type", "email", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_type_email_key" ON "Consumer"("type", "email");

-- CreateIndex
CREATE INDEX "Subscription_ID_plan_idx" ON "Subscription"("ID", "plan");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_plan_key" ON "Subscription"("plan");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
