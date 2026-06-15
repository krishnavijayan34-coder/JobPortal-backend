-- CreateTable
CREATE TABLE `JobSeekerSkill` (
    `jobSeekerId` INTEGER NOT NULL,
    `skillId` INTEGER NOT NULL,

    PRIMARY KEY (`jobSeekerId`, `skillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SavedJob` (
    `savedJobId` INTEGER NOT NULL AUTO_INCREMENT,
    `jobSeekerId` INTEGER NOT NULL,
    `jobId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`savedJobId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobSeekerSkill` ADD CONSTRAINT `JobSeekerSkill_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`jobSeekerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSeekerSkill` ADD CONSTRAINT `JobSeekerSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`skillId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedJob` ADD CONSTRAINT `SavedJob_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`jobSeekerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedJob` ADD CONSTRAINT `SavedJob_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`jobId`) ON DELETE RESTRICT ON UPDATE CASCADE;
