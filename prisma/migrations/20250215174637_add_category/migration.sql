/*
  Warnings:

  - Made the column `category` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `category` VARCHAR(191) NOT NULL DEFAULT 'any';
