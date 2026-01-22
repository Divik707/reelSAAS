/*
  Warnings:

  - You are about to drop the column `foodPartner` on the `Food` table. All the data in the column will be lost.
  - Added the required column `foodPartnerId` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_foodPartner_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "foodPartner",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "foodPartnerId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_foodPartnerId_fkey" FOREIGN KEY ("foodPartnerId") REFERENCES "FoodPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
