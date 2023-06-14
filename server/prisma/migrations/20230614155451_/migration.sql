/*
  Warnings:

  - Made the column `cumRating` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "cumRating" SET NOT NULL,
ALTER COLUMN "cumRating" SET DEFAULT 0;
