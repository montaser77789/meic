"use server";

import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { sectionSchema, sectionUpdateSchema } from "@/validation/sections";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { db } from "@/server/db/prisma";
import { revalidatePath } from "next/cache";
import { Routes } from "@/components/constants/enum";

export const createSection = async (
  args: {
    features_ar: string[];
    features_en: string[];
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = sectionSchema().safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      //   error: result.error.formErrors.fieldErrors,
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

  const returnValue = await UploadImage({ imageFile });
  const { imageUrl, publicId: uniqueName } = returnValue || {};
  if (typeof imageUrl !== "string") {
    return {
      status: 500,
      message: "فشل رفع الصورة",
    };
  }

  try {
    await db.section.create({
      data: {
        title_ar: data.title_ar,
        title_en: data.title_en,
        description_ar: data.description_ar,
        description_en: data.description_en,
        image: imageUrl,
        slug: data.title_en.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-"),
        features_ar: args.features_ar,
        features_en: args.features_en,
        publicId: uniqueName || "",
      },
    });
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}`);
    return {
      status: 201,
      message: "تم اضافة القسم بنجاح",
    };
  } catch (error) {
    console.error("Error saving image locally:", error);
    return {
      status: 500,
      message: "خطا في السيرفر",
    };
  }
};

export const updateSection = async (
  args: {
    id: string;
    publicId: string;
    features_ar: string[];
    features_en: string[];
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = sectionUpdateSchema().safeParse(
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

  const hasNewImage = Boolean(imageFile?.size);
  let imageUrl: string | undefined;
  let newPublicId;
  if (hasNewImage) {
    const returnValue = await UploadImage({ imageFile });
    imageUrl = returnValue?.imageUrl;
    newPublicId = returnValue?.publicId;
  }

  try {
    await db.section.update({
      where: {
        id: args.id,
      },
      data: {
        title_ar: data.title_ar,
        title_en: data.title_en,
        description_ar: data.description_ar,
        description_en: data.description_en,
        image: imageUrl,
        slug: data.title_en.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-"),
        features_ar: args.features_ar,
        features_en: args.features_en,
        publicId: newPublicId || args.publicId,
      },
    });
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${data.title_en
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "-")}/edit`
    );

    return {
      status: 200,
      message: "تم تعديل القسم بنجاح",
    };
  } catch (error) {
    console.error("Error updating section:", error);
    return {
      status: 500,
      message: "خطا في السيرفر",
    };
  }
};

export const deleteSection = async (id: string , publicId?: string) => {
  const locale = await getCurrentLocale();
  try {
    if (publicId) {
      const oldImagePath = path.join(process.cwd(), "public/uploads", publicId);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    await db.section.delete({ where: { id } });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}`);

    return { status: 200, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { status: 500, message: "Failed to delete product" };
  }
};

const UploadImage = async ({
  imageFile,
  publicId,
}: {
  imageFile: {
    size: number;
    arrayBuffer: () => Promise<ArrayBuffer>;
    type: string;
  };
  publicId?: string;
}): Promise<{ imageUrl: string; publicId: string } | undefined> => {
  try {
    if (publicId) {
      const oldImagePath = path.join(process.cwd(), "public/uploads", publicId);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueName = `${Date.now()}-${randomUUID()}.jpg`;
    const filePath = path.join(uploadsDir, uniqueName);
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `${process.env.NEXT_PUBLIC_URL}/uploads/${uniqueName}`;

    return {
      imageUrl,
      publicId: uniqueName,
    };
  } catch (error) {
    console.error("❌ Error saving image locally:", error);
    return undefined;
  }
};
