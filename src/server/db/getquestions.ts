import { cache } from "./cache";
import { db } from "./prisma";

export const getQuestions = cache(
  async ({ role, locale }: { role: "admin" | "user"; locale: "en" | "ar" }) => {
    const questions = await db.question.findMany();

    if (role === "admin") {
      return questions.map((question) => ({
        id: question.id,
        question_en: question.question_en,
        answer_en: question.answer_en,
        question_ar: question.question_ar,
        answer_ar: question.answer_ar,
      }));
    } else {
      return questions.map((question) => ({
        id: question.id,
        text: locale === "ar" ? question.question_ar : question.question_en,
        answer: locale === "ar" ? question.answer_ar : question.answer_en,
      }));
    }
  },
  ({ role, locale }) => [`questions-${role}-${locale}`],
  { revalidate: 3600 }
);

export const getQuestion = cache(
  async ({
    role,
    locale,
    sectionId,
  }: {
    role: "admin" | "user";
    locale: "en" | "ar";
    sectionId: string;
  }) => {
    const questions = await db.question.findMany({
      where: { sectionId },
    });

    if (role === "admin") {
      return questions;
    } else {
      return questions.map((question) => ({
        id: question.id,
        question: locale === "ar" ? question.question_ar : question.question_en,
        answer: locale === "ar" ? question.answer_ar : question.answer_en,
      }));
    }
  },
  ({ role, locale, sectionId }) => [`questions-${role}-${locale}-${sectionId}`],
  { revalidate: 3600 }
);
