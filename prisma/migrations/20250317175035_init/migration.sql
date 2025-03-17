/*
  Warnings:

  - You are about to alter the column `totalRating` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "book" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "totalRating" SET DEFAULT 0,
ALTER COLUMN "totalRating" SET DATA TYPE INTEGER;
