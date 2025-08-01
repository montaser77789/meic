"use server";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { imageToOurWorkSchema } from "@/validation/services";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { db } from "@/server/db/prisma";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/components/constants/enum";


export const addourworkImage = async (
  args: { sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = imageToOurWorkSchema().safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData,
    };
  }

  if (!args.sectionId) {
    return {
      status: 400,
      message: "Please select a valid Our Work item",
    };
  }

  const data = result.data;
  const imageFile = data?.image as unknown as {
    size: number;
    arrayBuffer: () => Promise<ArrayBuffer>;
    type: string;
  };

  if (!imageFile?.size) {
    return {
      status: 400,
      message: "Image is required",
    };
  }
  let imageUrl;
  let uniqueName;

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

  try {
    // رفع الصورة مباشرة إلى Cloudinary

    await db.galleryImage.create({
      data: {
        url: imageUrl,
        sectionId: args.sectionId ,
      },
    });

    // إعادة تحميل المسارات
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.GALLERIES}`);
    revalidatePath(`/${locale}/${args.sectionId}`);

    return {
      status: 200,
      message: "Image added successfully",
    };
  } catch (error) {
    console.error("Error adding work image:", error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};


export const deleteImageFromMyWork = async ({
  id,
  publicId,
  sectionId,
}: {
  id: string;
  publicId: string;
  sectionId: string;
}) => {
  const locale = await getCurrentLocale();
  try {
    if (publicId) {
      const oldImagePath = path.join(process.cwd(), "public/uploads", publicId);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
  } catch (error) {
    console.error("Failed to delete from Cloudinary", error);
  }

  try {
   await db.galleryImage.delete({
      where: {
        id: id,
      },
    });

    // إعادة تحميل المسارات

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.GALLERIES}`);
    revalidatePath(`/${locale}/${sectionId}`);

    return {
      status: 200,
      message: "Image deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
