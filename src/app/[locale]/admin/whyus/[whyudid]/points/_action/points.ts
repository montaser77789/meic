"use server";

import { Pages, Routes } from "@/components/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/server/db/prisma";
import { serviceSchema } from "@/validation/services";
import { revalidatePath } from "next/cache";

export const addPointstoWhyus = async (
  args: { whyudid: string },
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
    await db.whyusPoint.create({
      data: {
        desc_ar: data.desc_ar,
        title_ar: data.title_ar,
        desc_en: data.desc_en,
        title_en: data.title_en,
        sectionId: args.whyudid,
      },
    });
    const whyus = await db.whyusSection.findUnique({
      where: { id: args.whyudid },
      include: { Section: true },
    });
    if (whyus?.Section?.id) {
      revalidatePath(`/${locale}/${whyus.Section.id}`);
    }
    // إعادة تحميل المسارات
    revalidatePath(`/${locale}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.WHYUS}/${args.whyudid}/points`
    );
    revalidatePath(`/${locale}/${args.whyudid}`);

    return { status: 200, message: "تم اضافة النقطة بنجاح" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

export const updatePointstoWhyus = async (
  args: { whyudid: string; id: string },
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
    await db.whyusPoint.update({
      where: { id: args.id },
      data: {
        desc_ar: data.desc_ar,
        title_ar: data.title_ar,
        desc_en: data.desc_en,
        title_en: data.title_en,
      },
    });
    // إعادة تحميل المسارات
    const whyus = await db.whyusSection.findUnique({
      where: { id: args.whyudid },
      include: { Section: true },
    });
    if (whyus?.Section?.id) {
      revalidatePath(`/${locale}/${whyus.Section.id}`);
    }
    revalidatePath(`/${locale}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.WHYUS}/${args.whyudid}/points`
    );
    revalidatePath(`/${locale}/${args.whyudid}`);
    return {
      status: 200,
      message: "تم تحديث النقطة بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
export const deletePoint = async (id: string, whyudid: string) => {
  const locale = await getCurrentLocale();
  try {
    console.log("Deleting service with ID:", id);

    const existingService = await db.whyusPoint.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new Error("Service not found");
    }

    await db.whyusPoint.delete({
      where: { id },
    });
    const whyus = await db.whyusSection.findUnique({
      where: { id: whyudid },
      include: { Section: true },
    });
    if (whyus?.Section?.id) {
      revalidatePath(`/${locale}/${whyus.Section.id}`);
    }
    // إعادة تحميل المسارات
    revalidatePath(`/${locale}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.WHYUS}/${whyudid}/points`
    );
    revalidatePath(`/${locale}/${whyudid}`);

    return { status: 200, message: "تم حذف النقطة بنجاح" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { status: 500, message: "Failed to delete product" };
  }
};
