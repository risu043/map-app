-- CreateTable
CREATE TABLE "markers" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "markers_pkey" PRIMARY KEY ("id")
);
