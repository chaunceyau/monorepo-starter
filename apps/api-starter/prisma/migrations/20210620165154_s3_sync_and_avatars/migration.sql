-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarRemoteKey" TEXT;

-- CreateTable
CREATE TABLE "S3Sync" (
    "remote_file_key" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,

    PRIMARY KEY ("remote_file_key")
);

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("avatarRemoteKey") REFERENCES "S3Sync"("remote_file_key") ON DELETE SET NULL ON UPDATE CASCADE;
