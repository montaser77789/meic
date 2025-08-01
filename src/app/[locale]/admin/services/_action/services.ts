"use server";

import { Routes } from "@/components/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/server/db/prisma";
import { serviceSchema } from "@/validation/services";
import { revalidatePath } from "next/cache";
import { ar } from "zod/v4/locales";

export const addServces = async (
  args: { sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  if (!args.sectionId) {
    return {
      status: 400,
      message: "يرجى تحديد القسم",
      formData,
    };
  }
  const result = serviceSchema().safeParse(
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
    await db.services.create({
      data: {
        title_ar: data.title_ar,
        title_en: data.title_en,
        desc_ar: data.desc_ar,
        desc_en: data.desc_en,
        sectionId: args.sectionId,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Routes.SERVICES}`);
    revalidatePath(`/${locale}/${args.sectionId}`);
    return {
      status: 201,
      message: "تم اضافة الخدمة بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "خطأ في اضافة الخدمة",
    };
  }
};

export const UpdateServices = async (
 args: { id: string; sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = serviceSchema().safeParse(
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
    await db.services.update({
      where: { id: args.id },
      data: {
        title_ar: data.title_ar,
        title_en: data.title_en,
        desc_ar: data.desc_ar,
        desc_en: data.desc_en,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Routes.SERVICES}`);
    revalidatePath(`/${locale}/${args.sectionId}`);
    return {
      status: 200,
      message: "تم تحديث الخدمة بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "خطأ في تحديث الخدمة",
    };
  }
};
export const deleteServices = async ({ id, sectionId }: { id: string; sectionId: string }) => {
  const locale = await getCurrentLocale();
  try {
    console.log("Deleting service with ID:", id);

    const existingService = await db.services.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new Error("Service not found");
    }

    await db.services.delete({
      where: { id },
    });

    revalidatePath(`/${locale}/${sectionId}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Routes.SERVICES}`);

    return { status: 200, message:"تم حذف الخدمة بنجاح" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { status: 500, message: "Failed to delete product" };
  }
};
