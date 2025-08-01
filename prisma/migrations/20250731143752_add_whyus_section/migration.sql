-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_sectionId_fkey";

-- CreateTable
CREATE TABLE "public"."WhyusSection" (
    "id" TEXT NOT NULL,
    "heading_ar" TEXT NOT NULL,
    "heading_en" TEXT NOT NULL,
    "subheading_ar" TEXT NOT NULL,
    "subheading_en" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sectionId" TEXT,

    CONSTRAINT "WhyusSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WhyusPoint" (
    "id" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhyusPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhyusSection" ADD CONSTRAINT "WhyusSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhyusPoint" ADD CONSTRAINT "WhyusPoint_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."WhyusSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
