/*
  Warnings:

  - The primary key for the `Food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FoodPartner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_foodPartner_fkey";

-- AlterTable
ALTER TABLE "Food" DROP CONSTRAINT "Food_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "foodPartner" SET DATA TYPE TEXT,
ADD CONSTRAINT "Food_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Food_id_seq";

-- AlterTable
ALTER TABLE "FoodPartner" DROP CONSTRAINT "FoodPartner_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FoodPartner_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FoodPartner_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_foodPartner_fkey" FOREIGN KEY ("foodPartner") REFERENCES "FoodPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
