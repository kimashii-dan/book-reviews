-- AlterTable
ALTER TABLE "book" ALTER COLUMN "publishDate" DROP NOT NULL,
ALTER COLUMN "publishDate" SET DATA TYPE TEXT;
