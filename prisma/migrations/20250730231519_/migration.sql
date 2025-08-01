-- CreateTable
CREATE TABLE "public"."Question" (
    "id" TEXT NOT NULL,
    "question_ar" TEXT NOT NULL,
    "question_en" TEXT NOT NULL,
    "answer_ar" TEXT NOT NULL,
    "answer_en" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sectionId" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
