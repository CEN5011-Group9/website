/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `clubs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `clubs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clubs" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clubs_phone_key" ON "clubs"("phone");
