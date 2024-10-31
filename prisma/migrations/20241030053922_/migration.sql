-- AlterTable
ALTER TABLE "markers" ALTER COLUMN "category" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "markerId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_userId_idx" ON "Post"("userId");

-- CreateIndex
CREATE INDEX "Post_markerId_idx" ON "Post"("markerId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_markerId_fkey" FOREIGN KEY ("markerId") REFERENCES "markers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
