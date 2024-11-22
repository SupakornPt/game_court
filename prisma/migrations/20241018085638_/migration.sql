/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_paymentMethodId_fkey`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `paymentMethodId`,
    MODIFY `isPaid` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `slipConfirm` BOOLEAN NOT NULL DEFAULT false;
