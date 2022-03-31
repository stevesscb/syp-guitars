-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_guitarId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_guitarId_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "guitarId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "guitarId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_guitarId_fkey" FOREIGN KEY ("guitarId") REFERENCES "Guitar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_guitarId_fkey" FOREIGN KEY ("guitarId") REFERENCES "Guitar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
