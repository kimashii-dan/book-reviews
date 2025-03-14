/*
  Warnings:

  - Added the required column `publishDate` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book" ADD COLUMN     "publishDate" INTEGER NOT NULL;
