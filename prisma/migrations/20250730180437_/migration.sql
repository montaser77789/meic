-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_sectionId_fkey";

-- AlterTable
ALTER TABLE "public"."Service" ADD COLUMN     "servicesId" TEXT;

-- CreateTable
CREATE TABLE "public"."Services" (
    "id" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "public"."Services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
