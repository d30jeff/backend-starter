-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH VERSION "3.4.2";

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

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "ID" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PhoneNumber" (
    "ID" TEXT NOT NULL,
    "diallingCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "PhoneNumber_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Consumer" (
    "ID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ConsumerProfile" (
    "ID" TEXT NOT NULL,
    "fullName" TEXT,
    "gender" TEXT NOT NULL DEFAULT 'MALE',
    "consumerID" TEXT NOT NULL,

    CONSTRAINT "ConsumerProfile_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "ID" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Membership" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Organization" (
    "ID" TEXT NOT NULL,
    "coords" geometry(Point, 4326) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("ID")
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
CREATE UNIQUE INDEX "Consumer_email_key" ON "Consumer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_phone_key" ON "Consumer"("phone");

-- CreateIndex
CREATE INDEX "Consumer_ID_email_phone_idx" ON "Consumer"("ID", "email", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerProfile_consumerID_key" ON "ConsumerProfile"("consumerID");

-- CreateIndex
CREATE INDEX "Membership_ID_type_code_idx" ON "Membership"("ID", "type", "code");

-- CreateIndex
CREATE INDEX "location_idx" ON "Organization" USING GIST ("coords");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateID_fkey" FOREIGN KEY ("stateID") REFERENCES "State"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerProfile" ADD CONSTRAINT "ConsumerProfile_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
