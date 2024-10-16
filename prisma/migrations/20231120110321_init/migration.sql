/*
  Warnings:

  - You are about to drop the column `listingId` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the `listings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `houseId` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_userId_fkey";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_listingId_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "listingId",
ADD COLUMN     "houseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "listings";

-- CreateTable
CREATE TABLE "house" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "bathroomCount" INTEGER NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "locationValue" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "house_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "house" ADD CONSTRAINT "house_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE CASCADE;
