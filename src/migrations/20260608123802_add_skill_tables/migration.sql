/*
  Warnings:

  - You are about to drop the column `email` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `jobseeker` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `jobseeker` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `jobseeker` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `jobseeker` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `jobseeker` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `jobseeker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId,jobSeekerId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `JobSeeker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobSeekerId,jobId]` on the table `SavedJob` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `JobSeeker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `jobseekerskill` DROP FOREIGN KEY `JobSeekerSkill_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `jobseekerskill` DROP FOREIGN KEY `JobSeekerSkill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `jobskill` DROP FOREIGN KEY `JobSkill_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `jobskill` DROP FOREIGN KEY `JobSkill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `savedjob` DROP FOREIGN KEY `SavedJob_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `savedjob` DROP FOREIGN KEY `SavedJob_jobSeekerId_fkey`;

-- DropIndex
DROP INDEX `Application_jobId_fkey` ON `application`;

-- DropIndex
DROP INDEX `Application_jobSeekerId_fkey` ON `application`;

-- DropIndex
DROP INDEX `Company_email_key` ON `company`;

-- DropIndex
DROP INDEX `Job_companyId_fkey` ON `job`;

-- DropIndex
DROP INDEX `JobSeeker_email_key` ON `jobseeker`;

-- DropIndex
DROP INDEX `JobSeekerSkill_skillId_fkey` ON `jobseekerskill`;

-- DropIndex
DROP INDEX `JobSkill_skillId_fkey` ON `jobskill`;

-- DropIndex
DROP INDEX `SavedJob_jobId_fkey` ON `savedjob`;

-- DropIndex
DROP INDEX `SavedJob_jobSeekerId_fkey` ON `savedjob`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `email`,
    DROP COLUMN `password`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `jobseeker` DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `isActive`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('JOBSEEKER', 'EMPLOYER') NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Application_jobId_jobSeekerId_key` ON `Application`(`jobId`, `jobSeekerId`);

-- CreateIndex
CREATE UNIQUE INDEX `Company_userId_key` ON `Company`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `JobSeeker_userId_key` ON `JobSeeker`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `SavedJob_jobSeekerId_jobId_key` ON `SavedJob`(`jobSeekerId`, `jobId`);

-- AddForeignKey
ALTER TABLE `JobSeeker` ADD CONSTRAINT `JobSeeker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`companyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`jobId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`jobSeekerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSkill` ADD CONSTRAINT `JobSkill_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`jobId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSkill` ADD CONSTRAINT `JobSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`skillId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSeekerSkill` ADD CONSTRAINT `JobSeekerSkill_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`jobSeekerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSeekerSkill` ADD CONSTRAINT `JobSeekerSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`skillId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedJob` ADD CONSTRAINT `SavedJob_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`jobSeekerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedJob` ADD CONSTRAINT `SavedJob_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`jobId`) ON DELETE CASCADE ON UPDATE CASCADE;
