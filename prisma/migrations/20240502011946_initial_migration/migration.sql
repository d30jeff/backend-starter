/*
  Warnings:

  - You are about to drop the column `fullName` on the `AdminProfile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminID]` on the table `AdminProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[diallingCode,phone,formatted]` on the table `PhoneNumber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `AdminProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formatted` to the `PhoneNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminProfile" DROP COLUMN "fullName",
ADD COLUMN     "adminID" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PhoneNumber" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "formatted" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "fullName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "Address" (
    "ID" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "stateID" TEXT NOT NULL,
    "phoneNumberID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ConsumerAddress" (
    "ID" TEXT NOT NULL,
    "consumerID" TEXT NOT NULL,
    "addressID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ConsumerAddress_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "Address_ID_postcode_stateID_phoneNumberID_idx" ON "Address"("ID", "postcode", "stateID", "phoneNumberID");

-- CreateIndex
CREATE INDEX "ConsumerAddress_ID_consumerID_addressID_idx" ON "ConsumerAddress"("ID", "consumerID", "addressID");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_adminID_key" ON "AdminProfile"("adminID");

-- CreateIndex
CREATE INDEX "AdminProfile_ID_adminID_idx" ON "AdminProfile"("ID", "adminID");

-- CreateIndex
CREATE INDEX "PhoneNumber_ID_idx" ON "PhoneNumber"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumber_diallingCode_phone_formatted_key" ON "PhoneNumber"("diallingCode", "phone", "formatted");

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Admin"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_phoneNumberID_fkey" FOREIGN KEY ("phoneNumberID") REFERENCES "PhoneNumber"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_stateID_fkey" FOREIGN KEY ("stateID") REFERENCES "State"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerAddress" ADD CONSTRAINT "ConsumerAddress_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerAddress" ADD CONSTRAINT "ConsumerAddress_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
