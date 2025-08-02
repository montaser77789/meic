"use server";
import { db } from "@/server/db/prisma";
import { equipmentSchema } from "@/validation/equipment";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/components/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const addEquipment = async (
  args: { eqcatagoryid: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = equipmentSchema().safeParse(
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
  const imageFile = data?.image as unknown as {
    size: number;
    arrayBuffer: () => Promise<ArrayBuffer>;
    type: string;
  };
  let imageUrl;
  let uniqueName;

  if (imageFile?.size) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      uniqueName = `${Date.now()}-${randomUUID()}.jpg`;
      const filePath = path.join(uploadsDir, uniqueName);

      fs.writeFileSync(filePath, buffer);

      // تعديل المسار ليشمل الدومين الكامل
      imageUrl = `${process.env.NEXT_PUBLIC_URL}/uploads/${uniqueName}`;
    } catch (error) {
      console.error("Error saving image locally:", error);
      return {
        status: 500,
        message: "Failed to upload image",
      };
    }
  }

  try {
    await db.equipment.create({
      data: {
        title_ar: data.title_ar,
        title_en: data.title_en,
        description_ar: data.description_ar,
        description_en: data.description_en,
        image: imageUrl,
        categoryId: args.eqcatagoryid,
      },
    });
    const whyus = await db.equipmentCategory.findUnique({
      where: { id: args.eqcatagoryid },
      include: { section: true },
    });
    if (whyus?.section?.id) {
      revalidatePath(`/${locale}/${whyus.section.id}`);
    }
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Routes.SERVICES}/${args.eqcatagoryid}`
    );

    return {
      status: 201,
      message: "تم اضافه  المعده  بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ اثناء اضافه الخدمه",
    };
  }
};

export const UpdateEquipment = async (
  id: string,
  publicId: string,
  equipmentsid: string,
  initialState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();

  const result = equipmentSchema().safeParse(
    Object.fromEntries(formData.entries())
  );
  console.log("data", publicId);

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData,
    };
  }
  const data = result.data;

  const imageFile = data?.image as unknown as {
    size: number;
    arrayBuffer: () => Promise<ArrayBuffer>;
    type: string;
  };

  const hasNewImage = Boolean(imageFile?.size);

  let imageUrl;
  let newPublicId;
  if (hasNewImage) {
    try {
      // حذف الصورة القديمة من مجلد uploads إذا كانت موجودة
      if (publicId) {
        const oldImagePath = path.join(
          process.cwd(),
          "public/uploads",
          publicId
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // رفع الصورة الجديدة
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const uniqueName = `${Date.now()}-${randomUUID()}.jpg`;
      const filePath = path.join(uploadsDir, uniqueName);

      fs.writeFileSync(filePath, buffer);

      // تعديل المسار ليشمل الدومين الكامل
      imageUrl = `${process.env.NEXT_PUBLIC_URL}/uploads/${uniqueName}`;
      newPublicId = uniqueName;
    } catch (error) {
      console.error("Error updating image:", error);
      return {
        status: 500,
        message: "Failed to update image",
      };
    }
  }

  try {
    const equipment = await db.equipment.findUnique({
      where: {
        id: id,
      },
    });
    if (!equipment) {
      return {
        status: 404,
        message: "equipment not found",
        formData,
      };
    }
    await db.equipment.update({
      where: {
        id: id,
      },

      data: {
        title_ar: data.title_ar,
        title_en: data.title_en,
        description_ar: data.description_ar,
        description_en: data.description_en,
        image: hasNewImage ? imageUrl : equipment.image,
        publicId: hasNewImage ? newPublicId : publicId,
        categoryId: equipmentsid,
      },
    });
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Routes.SERVICES}/${equipmentsid}`
    );
    revalidatePath(`/${locale}/${id}`);

    return {
      status: 200,
      message: "equipment updated successfully",
    };
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
  publicId,
  equipmentsid
}: {
  id: string;
  publicId?: string;
  equipmentsid : string
}) => {
  const locale = await getCurrentLocale();
  if (publicId) {
    const oldImagePath = path.join(process.cwd(), "public/uploads", publicId);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  try {
    await db.service.delete({
      where: {
        id: id,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Routes.SERVICES}/${equipmentsid}`);
    revalidatePath(`/${locale}/${id}`);

    return {
      status: 200,
      message: "equipment deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

