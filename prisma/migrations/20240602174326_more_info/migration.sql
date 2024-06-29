-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "JoinRequest" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "realName" TEXT;
