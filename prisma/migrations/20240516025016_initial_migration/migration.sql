-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH VERSION "3.3.4";

-- CreateTable
CREATE TABLE "Country" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "diallingCode" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "State" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryID" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "City" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stateID" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Admin" (
    "ID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "ID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "adminID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PhoneNumber" (
    "ID" TEXT NOT NULL,
    "diallingCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "formatted" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PhoneNumber_pkey" PRIMARY KEY ("ID")
);

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
CREATE TABLE "Consumer" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("ID")
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

-- CreateTable
CREATE TABLE "Profile" (
    "ID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "nric" TEXT,
    "gender" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "consumerID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

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
CREATE TABLE "Subscription" (
    "ID" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "MembershipCard" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "consumerID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembershipCard_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Organization" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coords" geometry(Point, 4326) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Outlet" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_diallingCode_key" ON "Country"("diallingCode");

-- CreateIndex
CREATE UNIQUE INDEX "Country_currencyCode_key" ON "Country"("currencyCode");

-- CreateIndex
CREATE INDEX "Country_ID_name_code_diallingCode_currencyCode_idx" ON "Country"("ID", "name", "code", "diallingCode", "currencyCode");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE INDEX "State_ID_name_countryID_idx" ON "State"("ID", "name", "countryID");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_ID_email_idx" ON "Admin"("ID", "email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_adminID_key" ON "AdminProfile"("adminID");

-- CreateIndex
CREATE INDEX "AdminProfile_ID_adminID_idx" ON "AdminProfile"("ID", "adminID");

-- CreateIndex
CREATE INDEX "PhoneNumber_ID_idx" ON "PhoneNumber"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumber_diallingCode_phone_formatted_key" ON "PhoneNumber"("diallingCode", "phone", "formatted");

-- CreateIndex
CREATE INDEX "Address_ID_postcode_stateID_phoneNumberID_idx" ON "Address"("ID", "postcode", "stateID", "phoneNumberID");

-- CreateIndex
CREATE INDEX "Consumer_ID_type_email_createdAt_updatedAt_idx" ON "Consumer"("ID", "type", "email", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_type_email_key" ON "Consumer"("type", "email");

-- CreateIndex
CREATE INDEX "ConsumerAddress_ID_consumerID_addressID_idx" ON "ConsumerAddress"("ID", "consumerID", "addressID");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_consumerID_key" ON "Profile"("consumerID");

-- CreateIndex
CREATE INDEX "Profile_ID_consumerID_idx" ON "Profile"("ID", "consumerID");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_consumerID_key" ON "Preference"("consumerID");

-- CreateIndex
CREATE INDEX "Preference_ID_consumerID_allowPushNotification_createdAt_idx" ON "Preference"("ID", "consumerID", "allowPushNotification", "createdAt");

-- CreateIndex
CREATE INDEX "Subscription_ID_plan_idx" ON "Subscription"("ID", "plan");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_plan_key" ON "Subscription"("plan");

-- CreateIndex
CREATE INDEX "MembershipCard_ID_type_code_idx" ON "MembershipCard"("ID", "type", "code");

-- CreateIndex
CREATE INDEX "location_idx" ON "Organization" USING GIST ("coords");

-- CreateIndex
CREATE UNIQUE INDEX "Outlet_name_organizationID_key" ON "Outlet"("name", "organizationID");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateID_fkey" FOREIGN KEY ("stateID") REFERENCES "State"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipCard" ADD CONSTRAINT "MembershipCard_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
