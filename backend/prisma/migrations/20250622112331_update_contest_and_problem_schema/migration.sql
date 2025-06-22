/*
  Warnings:

  - The primary key for the `ContestResult` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contestId` on the `ContestResult` table. All the data in the column will be lost.
  - Added the required column `id` to the `ContestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContestResult" DROP CONSTRAINT "ContestResult_pkey",
DROP COLUMN "contestId",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "ContestResult_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "contestId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "maxRank" DROP NOT NULL,
ALTER COLUMN "maxRating" DROP NOT NULL,
ALTER COLUMN "rank" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "ContestResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
