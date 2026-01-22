-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "foodPartner" INTEGER NOT NULL,
    "vedio" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_vedio_key" ON "Food"("vedio");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_foodPartner_fkey" FOREIGN KEY ("foodPartner") REFERENCES "FoodPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
