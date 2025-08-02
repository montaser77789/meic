import * as z from "zod";

export const equipmentCatagorySchema = () => {
  return z.object({
    name_en: z.string().min(1, { message: "ادخل اسم القسم باللغه الانجليزية" }),
    name_ar: z.string().min(1, { message: "ادخل اسم القسم باللغه العربية" }),
  });
};

export const equipmentSchema = () => {
  return z.object({
    image : z.custom((val) => val instanceof File).optional(),
    title_ar: z.string().min(1, { message: "ادخل اسم الجهاز باللغه الانجليزية" }),
    title_en: z.string().min(1, { message: "ادخل اسم الجهاز باللغه العربية" }),
    description_ar: z.string().min(1, { message: "ادخل وصف الجهاز باللغه الانجليزية" }),
    description_en: z.string().min(1, { message: "ادخل وصف الجهاز باللغه العربية" }),
  });
}
