/*
  Warnings:

  - The `description` column on the `Menu` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductQuantity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductQuantity" DROP CONSTRAINT "ProductQuantity_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductQuantity" DROP CONSTRAINT "ProductQuantity_productId_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];

-- DropTable
DROP TABLE "OrderProduct";

-- DropTable
DROP TABLE "ProductQuantity";
