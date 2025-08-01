-- CreateTable
CREATE TABLE "public"."WhyusImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "whyusSectionId" TEXT,

    CONSTRAINT "WhyusImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."WhyusImage" ADD CONSTRAINT "WhyusImage_whyusSectionId_fkey" FOREIGN KEY ("whyusSectionId") REFERENCES "public"."WhyusSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
