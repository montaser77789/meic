"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CameraIcon, EditIcon } from "lucide-react";
import { Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import Image from "next/image";
import { validationErrors } from "@/validation/auth";
import { toast } from "sonner";
import useFormFields from "@/hooks/useFormFields";
import { Service } from "@prisma/client";
import { UpdateService } from "../_action/service";

const EditServices = ({ Services ,servicesid }: { Services: Service , servicesid: string }) => {
  const [open, setOpen] = useState(false);
  const formData = new FormData();
  const initialState: {
    message?: string;
    error?: validationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData,
  };
  Object.entries(Services!).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  const [selectedImage, setSelectedImage] = useState(Services.image ?? "");
  console.log(Services.publicId);

  const { getFormFields } = useFormFields({
    slug: `/${Routes.ADMIN}/${Routes.SERVICES}/add`,
  });
  const [state, action, pending] = useActionState(
    UpdateService.bind(null, Services.id , Services.publicId ?? "" , servicesid),
    initialState
  );
  useEffect(() => {
    if (state.message && state.status && !pending) {
      toast(state.message, {
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
      setOpen(false);
    }
  }, [pending, state.message, state.status]);

  useEffect(() => {
    setSelectedImage(Services.image as string);
  }, [Services.image]);
  return (
    <div>
      <Dialog open={open}  onOpenChange={setOpen} >
        <DialogTrigger  asChild>
          <Button variant="outline"  onClick={() => setOpen(true)}>
            <EditIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[640px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-left">Edit Question</DialogTitle>
          </DialogHeader>
          <form action={action} className="grid gap-4 py-4">
            <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={Services.id}
                  width={200}
                  height={200}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[200px] h-[200px] bg-gray-200 rounded-full" />
              )}

              <div
                className={`${
                  selectedImage
                    ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
                    : ""
                } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
              >
                <UploadImage setSelectedImage={setSelectedImage} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {getFormFields().map((field) => {
                const fieldValue = state?.formData?.get(field.name);

                return (
                  <div key={field.name} className="mb-3">
                    <FormFields
                      {...field}
                      error={state?.error}
                      defaultValue={fieldValue as string}
                    />
                  </div>
                );
              })}
            </div>

            <DialogFooter>
              <Button type="submit">
                {pending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditServices;

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
    console.log(file);
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image"
        onChange={handleImageChange}
        name="image"
      />
      <label
        htmlFor="image"
        className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer"
      >
        <CameraIcon className="!w-8 !h-8 text-accent" />
      </label>
    </>
  );
};
