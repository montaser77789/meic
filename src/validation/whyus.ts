import { z } from "zod";
export const whyusSchema = () => {
  return z.object({
    heading_ar: z
      .string()
      .min(1, { message: "Heading in Arabic is required" }),
    heading_en: z
      .string()
      .min(1, { message: "Heading in Arabic is required" }),
    subheading_ar: z.string().min(1, { message: "Description in Arabic is required" }),
    subheading_en: z.string().min(1, { message: "Description in Arabic is required" }),
  });
};
