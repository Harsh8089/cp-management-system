/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `maxRank` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxRating` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "maxRank" TEXT NOT NULL,
ADD COLUMN     "maxRating" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "rank" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER,
ALTER COLUMN "createdAt" DROP DEFAULT;
