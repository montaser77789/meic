import { z } from "zod";

const imageValidation = (isRequired: boolean) => {
  return !isRequired
    ? z.custom((val) => val instanceof File)
    : z.custom(
        (val) => {
          if (typeof val !== "object" || !val) {
            console.log(val);
            return false;
          }
          if (!(val instanceof File)) {
            console.log(val);
            return false;
          }
          const validMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ];
          return validMimeTypes.includes(val.type);
        },
        {
          message: "من فضلك قم باختيار صورة صحيحة من نوع jpeg,png,gif,webp",
        }
      );
};


const getCommonValidations = () =>{
    return {
        title_ar: z.string().min(1, "من فضلك ادخل العنوان باللغة العربية"),
        title_en: z.string().min(1, "من فضلك ادخل العنوان باللغة الانجليزية"),
        description_ar: z.string().min(1, "من فضلك ادخل الوصف باللغة العربية"),
        description_en: z.string().min(1, "من فضلك ادخل الوصف باللغة الانجليزية"),
       
    }
}

export const sectionSchema = () => {
  return z.object({
    ...getCommonValidations(),
    image: imageValidation(true),
  });
};


export const sectionUpdateSchema = () => {
  return z.object({
    ...getCommonValidations(),
    image: imageValidation(false),
  });
};