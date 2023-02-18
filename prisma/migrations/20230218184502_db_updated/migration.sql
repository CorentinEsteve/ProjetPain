/*
  Warnings:

  - You are about to drop the column `cakeType` on the `Customization` table. All the data in the column will be lost.
  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `CookingClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custom` to the `Customization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CookingClass" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customization" DROP COLUMN "cakeType",
ADD COLUMN     "custom" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deliveryAddress" DROP NOT NULL,
ALTER COLUMN "loyaltyPoints" DROP NOT NULL,
ALTER COLUMN "loyaltyPoints" SET DEFAULT 0;

-- DropTable
DROP TABLE "FAQ";
