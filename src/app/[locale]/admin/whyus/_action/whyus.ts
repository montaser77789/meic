"use server";

import { Pages, Routes } from "@/components/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/server/db/prisma";
import { whyusSchema } from "@/validation/whyus";
import { revalidatePath } from "next/cache";

export const addwhyus = async (
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

  const result = whyusSchema().safeParse(
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
    await db.whyusSection.create({
      data: {
        heading_ar: data.heading_ar,
        heading_en: data.heading_en,
        subheading_ar: data.subheading_ar,
        subheading_en: data.subheading_en,
        sectionId: args.sectionId,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.WHYUS}`);
    revalidatePath(`/${locale}/${args.sectionId}`);
    return {
      status: 201,
      message: "تمت الاضافه بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "خطأ في اضافة الخدمة",
    };
  }
};

export const UpdateWhyus = async (
 args : { id: string, sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = whyusSchema().safeParse(
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
    await db.whyusSection.update({
      where: { id: args.id },
      data: {
        heading_ar: data.heading_ar,
        heading_en: data.heading_en,
        subheading_ar: data.subheading_ar,
        subheading_en: data.subheading_en,
      },
    });
    
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.WHYUS}`);
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

export const deleteWhyus = async ({ id , sectionId }: { id: string ; sectionId: string }) => {
  const locale = await getCurrentLocale();
  try {
    console.log("Deleting service with ID:", id);

    const existingService = await db.services.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new Error("Service not found");
    }

    await db.whyusSection.delete({
      where: { id },
    });

    revalidatePath(`/${locale}/${sectionId}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.WHYUS}`);

    return { status: 200, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { status: 500, message: "Failed to delete product" };
  }
};
