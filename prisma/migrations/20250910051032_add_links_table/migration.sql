/*
  Warnings:

  - You are about to drop the `urls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."urls";

-- CreateTable
CREATE TABLE "public"."links" (
    "id" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "short_code" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);
