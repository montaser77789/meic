-- DropForeignKey
ALTER TABLE "public"."GalleryImage" DROP CONSTRAINT "GalleryImage_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GalleryImage" ADD CONSTRAINT "GalleryImage_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
