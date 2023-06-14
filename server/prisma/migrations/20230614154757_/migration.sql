/*
  Warnings:

  - You are about to drop the column `avgRating` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "avgRating",
ADD COLUMN     "cumRating" DOUBLE PRECISION;
