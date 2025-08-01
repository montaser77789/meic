"use server";

import { Pages, Routes } from "@/components/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/server/db/prisma";
import { editQuestionSchema, questionSchema } from "@/validation/question";
import { revalidatePath } from "next/cache";

export const addquestion = async (
  args: { sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();

  const result = questionSchema().safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData,
    };
  }
  const data = result.data;
  try {
    await db.question.create({
      data: {
        answer_en: data.answer_en,
        question_en: data.question_en,
        question_ar: data.question_ar,
        answer_ar: data.answer_ar,
        sectionId: args.sectionId,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.questions}`);
    revalidatePath(`/${locale}/${args.sectionId}`);

    return { status: 200, message: "Question added successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
export const editquestion = async (
  args: { sectionId: string; id: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();

  const result = editQuestionSchema().safeParse(
    Object.fromEntries(formData.entries())
  );
  const data = result.data;

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
    };
  }

  try {
    const question = db.question.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!question) {
      return {
        message: "Question not found",
        status: 401,
      };
    }
    await db.question.update({
      where: {
        id: args.id,
      },
      data: {
        answer_en: data?.answer_en,
        question_en: data?.question_en,
        question_ar: data?.question_ar,
        answer_ar: data?.answer_ar,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.questions}`);
    revalidatePath(`/${locale}/${args.sectionId}`);

    return {
      status: 200,
      message: "Question updated successfully!",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

export const deleteQuestion = async ({ id , sectionId }: { id: string , sectionId: string }) => {
  const locale = await getCurrentLocale();

  try {
    await db.question.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.questions}`);
    revalidatePath(`/${locale}/${sectionId}`);

    return {
      status: 200,
      message: "Question deleted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
