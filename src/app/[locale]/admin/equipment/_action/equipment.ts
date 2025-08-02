"use server";
import { db } from "@/server/db/prisma";
import { questionSchema } from "@/validation/question";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/components/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { equipmentCatagorySchema } from "@/validation/equipment";
export const addequipmentCategory = async (
  args: { sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();

  const result = equipmentCatagorySchema().safeParse(
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
    await db.equipmentCategory.create({
      data: {
        name_ar: data.name_ar,
        name_en: data.name_en,
        sectionId: args.sectionId,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.EQUIPMENT}`);
    revalidatePath(`/${locale}/${args.sectionId}`);

    return { status: 200, message: "Equipment added successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
export const updateequipmentCategory = async (
  args: { id: string; sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = equipmentCatagorySchema().safeParse(
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
    await db.equipmentCategory.update({
      where: { id: args.id },
      data: {
        name_ar: data.name_ar,
        name_en: data.name_en,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.EQUIPMENT}`);
    revalidatePath(`/${locale}/${args.sectionId}`);

    return { status: 200, message: "Equipment updated successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

export const deleteEquipment = async ({
  id,
  sectionId,
}: {
  id: string;
  sectionId: string;
}) => {
  const locale = await getCurrentLocale();
  try {
    console.log("Deleting service with ID:", id);

    const existingService = await db.equipmentCategory.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new Error("Service not found");
    }

    await db.equipmentCategory.delete({
      where: { id },
    });

    revalidatePath(`/${locale}/${sectionId}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.EQUIPMENT}`);

    return { status: 200, message: "equipment deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { status: 500, message: "Failed to delete product" };
  }
};
