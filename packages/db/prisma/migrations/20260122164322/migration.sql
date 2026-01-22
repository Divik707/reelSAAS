/*
  Warnings:

  - You are about to drop the column `vedio` on the `Food` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[video]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `video` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Food_vedio_key";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "vedio",
ADD COLUMN     "video" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Food_video_key" ON "Food"("video");
