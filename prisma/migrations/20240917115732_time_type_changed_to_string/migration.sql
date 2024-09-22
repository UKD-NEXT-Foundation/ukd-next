/*
  Warnings:

  - Changed the type of `startAt` on the `schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endAt` on the `schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "startAt",
ADD COLUMN     "startAt" VARCHAR(5) NOT NULL,
DROP COLUMN "endAt",
ADD COLUMN     "endAt" VARCHAR(5) NOT NULL;
