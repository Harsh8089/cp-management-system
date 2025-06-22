/*
  Warnings:

  - You are about to drop the column `submissionId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "submissionId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Submission";

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
