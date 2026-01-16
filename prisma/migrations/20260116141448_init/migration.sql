-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "published" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;
