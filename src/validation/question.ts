import * as z from "zod";

export const questionSchema = () => {
  return z.object({
    question_en: z
      .string()
      .min(1, { message: "Question in English is required" }),
    answer_en: z
      .string()
      .min(1, { message: "Answer in English is required" }),
    question_ar: z
      .string()
      .min(1, { message: "Question in Arabic is required" }),
    answer_ar: z
      .string()
      .min(1, { message: "Answer in Arabic is required" }),
  });
};


export const editQuestionSchema = () => {
  return z.object({
    question_en: z
      .string()
      .min(1, { message: "Question in English is required" }),
    answer_en: z
      .string()
      .min(1, { message: "Answer in English is required" }),
    question_ar: z
      .string()
      .min(1, { message: "Question in Arabic is required" }),
    answer_ar: z
      .string()
      .min(1, { message: "Answer in Arabic is required" }),
  });
};

