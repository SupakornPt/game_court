/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `statuspayment` ENUM('WAITING_PAY', 'PENDING', 'REJECT', 'SEND') NOT NULL DEFAULT 'WAITING_PAY';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
