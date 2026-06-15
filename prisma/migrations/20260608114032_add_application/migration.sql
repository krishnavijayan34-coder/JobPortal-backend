/*
  Warnings:

  - The primary key for the `jobseeker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jobSekkerId` on the `jobseeker` table. All the data in the column will be lost.
  - Added the required column `jobSeekerId` to the `JobSeeker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jobseeker` DROP PRIMARY KEY,
    DROP COLUMN `jobSekkerId`,
    ADD COLUMN `jobSeekerId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`jobSeekerId`);

-- CreateTable
CREATE TABLE `Application` (
    `applicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `jobId` INTEGER NOT NULL,
    `jobSeekerId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `appliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`applicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`jobId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`jobSeekerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
