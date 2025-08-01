"use client";
import { Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { createSection, updateSection } from "../_action/Section";
import { validationErrors } from "@/validation/auth";
import { toast } from "sonner";
import { Section } from "@prisma/client";
type InitialStateType = {
  message?: string;
  error?: validationErrors;
  status?: number | null;
  formData?: FormData;
};
const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
  formData: new FormData(),
};

const Form = ({ section }: { section?: Section }) => {
  const [selectedImage, setSelectedImage] = useState(
    section ? section.image : ""
  );
  const { getFormFields } = useFormFields({ slug: `${Routes.ADMIN}` });
  const [features_ar, setFeatures_ar] = React.useState<string[]>(
    section ? section.features_ar : [""]
  );
  const [features_en, setFeatures_en] = React.useState<string[]>(
    section ? section.features_en : [""]
  );

  const addFeature = () => {
    setFeatures_ar([...features_ar, ""]);
  };
  const removeFeature = (indexToRemove: number) => {
    const filtered = features_ar.filter((_, i) => i !== indexToRemove);
    setFeatures_ar(filtered.length === 0 ? [""] : filtered);
  };

  const addFeature_en = () => {
    setFeatures_en([...features_en, ""]);
  };
  const removeFeature_en = (indexToRemove: number) => {
    const filtered = features_en.filter((_, i) => i !== indexToRemove);
    setFeatures_en(filtered.length === 0 ? [""] : filtered);
  };
  const formData = new FormData();
  Object.entries(section ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  const [state, action, pending] = useActionState(
    section
      ? updateSection.bind(null, { publicId: section?.publicId || "" , id: section.id, features_ar, features_en })
      : createSection.bind(null, { features_ar, features_en }),
    initialState
  );

  useEffect(() => {
    if (state?.message && state.status && !pending) {
      toast(state.message, {
        className:
          state.status === 200 || state.status === 201
            ? "text-green-400"
            : "text-destructive",
      });
    }
  }, [pending, state?.message, state?.status]);

  console.log(state?.error?.image);
  console.log(state);
  return (
    <form action={action}>
      <div className="flex flex-col md:flex-row gap-10 flex-wrap">
        <div className="group relative w-[200px] h-[200px] overflow-hidden mx-auto">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={"profile"}
              fill
              className=" object-cover"
            />
          )}
          {state?.error?.image && (
            <p className="text-sm text-destructive text-center mt-4 font-medium">
              {state.error?.image}
            </p>
          )}
          <div
            className={`${
              selectedImage
                ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
                : ""
            } absolute top-0 left-0   w-full h-full bg-gray-50/40`}
          >
            <UploadImage setSelectedImage={setSelectedImage} />
          </div>
        </div>
        <div className="flex-1">
          {getFormFields().map((field) => {
            const defaultValue =
              state.formData?.get(field.name) ?? formData.get(field.name);
            return (
              <div key={field.name} className="mb-3">
                <FormFields
                  error={state?.error}
                  {...field}
                  defaultValue={defaultValue as string}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className=" flex flex-col md:flex-row gap-10 w-full">
        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700">
            اضافة خصائص{" "}
          </label>

          {features_ar.map((url, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="ادخل الخصائص باللغه العربية"
                value={url}
                onChange={(e) => {
                  const updated = [...features_ar];
                  updated[index] = e.target.value;
                  setFeatures_ar(updated);
                }}
              />
              {features_ar.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700 font-bold text-xl"
                  title="حذف"
                >
                  &times;
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addFeature}>
            اللغه العربية اضافه خاصيه جديده
          </Button>
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700">
            اضافة خصائص{" "}
          </label>

          {features_en.map((url, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="ادخل الخصائص باللغه الانجليزية"
                value={url}
                onChange={(e) => {
                  const updated = [...features_en];
                  updated[index] = e.target.value;
                  setFeatures_en(updated);
                }}
              />
              {features_en.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeFeature_en(index)}
                  className="text-red-500 hover:text-red-700 font-bold text-xl"
                  title="حذف"
                >
                  &times;
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addFeature_en}>
            اللغه الانجليزية اضافه خاصيه جديده
          </Button>
        </div>
      </div>

      <Button disabled={pending} type="submit" className="mt-4 w-full">
        {pending ? "جاري التحميل" : "حفظ"}
      </Button>
    </form>
  );
};

export default Form;

const UploadImage = ({
  setSelectedImage,
  
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />
      <label
        htmlFor="image-upload"
        className="border  w-[200px] h-[200px] element-center cursor-pointer"
      >
        <CameraIcon className="!w-8 !h-8 text-accent" />
      </label>
    </>
  );
};
