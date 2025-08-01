"use server";
import { Routes } from "@/components/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/server/db/prisma";
import { servicSchema } from "@/validation/services";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const addservice = async (
  args: { sectionId: string },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const result = servicSchema().safeParse(
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
    await db.service.create({
      data: {
        title_en: data.title_en,
        title_ar: data.title_ar,
        desc_en: data.desc_en,
        desc_ar: data.desc_en,
        image: imageUrl || "",
        publicId: uniqueName || "",
        servicesId: args.sectionId,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Routes.SERVICES}/${args.sectionId}`);
    revalidatePath(`/${locale}/${args.sectionId}`);

    return {
      status: 201,
      message: "تم اضافه الخدمه بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ اثناء اضافه الخدمه",
    };
  }
};

export const UpdateService = async (
  id: string,
  publicId: string,
  servicesid: string,
  initialState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();

  const result = servicSchema().safeParse(
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
    const service = await db.service.findUnique({
      where: {
        id: id,
      },
    });
    if (!service) {
      return {
        status: 404,
        message: "Service not found",
        formData,
      };
    }
    await db.service.update({
      where: {
        id: id,
      },

      data: {
        title_en: data?.title_en,
        title_ar: data?.title_ar,
        desc_en: data?.desc_en,
        desc_ar: data?.desc_ar,

        image: imageUrl ?? service.image,
        publicId: newPublicId ?? service.publicId,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Routes.SERVICES}/${servicesid}`);
    revalidatePath(`/${locale}/${servicesid}`);

    return {
      status: 200,
      message: "Service updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};


export const deleteService = async ({
  id,
  publicId,
  servicesid
}: {
  id: string;
  publicId?: string;
  servicesid : string
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

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Routes.SERVICES}/${servicesid}`);
    revalidatePath(`/${locale}/${id}`);

    return {
      status: 200,
      message: "Service deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
