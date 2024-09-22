/*
  Warnings:

  - You are about to drop the `groups-on-schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups-on-schedules" DROP CONSTRAINT "groups-on-schedules_groupId_fkey";

-- DropForeignKey
ALTER TABLE "groups-on-schedules" DROP CONSTRAINT "groups-on-schedules_scheduleId_fkey";

-- DropTable
DROP TABLE "groups-on-schedules";

-- CreateTable
CREATE TABLE "_groups-on-schedules" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_groups-on-schedules_AB_unique" ON "_groups-on-schedules"("A", "B");

-- CreateIndex
CREATE INDEX "_groups-on-schedules_B_index" ON "_groups-on-schedules"("B");

-- AddForeignKey
ALTER TABLE "_groups-on-schedules" ADD CONSTRAINT "_groups-on-schedules_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groups-on-schedules" ADD CONSTRAINT "_groups-on-schedules_B_fkey" FOREIGN KEY ("B") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
