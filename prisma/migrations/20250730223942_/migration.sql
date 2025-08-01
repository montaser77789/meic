-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_servicesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Services" DROP CONSTRAINT "Services_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Services" ADD CONSTRAINT "Services_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "public"."Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
