/*
  Warnings:

  - Made the column `quantity` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Article` MODIFY `quantity` INTEGER NOT NULL;
