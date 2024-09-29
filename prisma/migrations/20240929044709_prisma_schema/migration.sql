-- AlterTable
ALTER TABLE "markers" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'uncategorized',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "message" TEXT NOT NULL DEFAULT '';
