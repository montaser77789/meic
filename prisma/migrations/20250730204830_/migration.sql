-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_sectionId_fkey";

-- AlterTable
ALTER TABLE "public"."Services" ADD COLUMN     "sectionId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Services" ADD CONSTRAINT "Services_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
