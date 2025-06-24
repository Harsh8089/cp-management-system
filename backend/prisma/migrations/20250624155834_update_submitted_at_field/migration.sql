/*
  Warnings:

  - The `submittedAt` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "submittedAt",
ADD COLUMN     "submittedAt" TIMESTAMP(3)[];
