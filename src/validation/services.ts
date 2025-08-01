import z from "zod";

export const serviceSchema = () => {
  return z.object({

    title_en: z.string().min(1, { message: "Title in English is required" }),
    title_ar: z.string().min(1, { message: "Title in Arabic is required" }),
    desc_en: z
      .string()
      .min(1, { message: "Description in English is required" }),
    desc_ar: z
      .string()
      .min(1, { message: "Description in Arabic is required" }),
  });
};

export const servicSchema = () => {
  return z.object({
    image: z.custom((val) => val instanceof File).optional(),
    publicId: z.string().optional(), // ← أضفنا ده هنا

    title_en: z.string().min(1, { message: "Title in English is required" }),
    title_ar: z.string().min(1, { message: "Title in Arabic is required" }),
    desc_en: z
      .string()
      .min(1, { message: "Description in English is required" }),
    desc_ar: z
      .string()
      .min(1, { message: "Description in Arabic is required" }),
  });
};


export const imageToOurWorkSchema = () => {
  return z.object({ image: z.custom((val) => val instanceof File).optional() });
};

 
