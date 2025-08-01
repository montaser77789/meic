"use client";
import { Button } from "@/components/ui/button";
import { validationErrors } from "@/validation/auth";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { addwhyusImage } from "../_action/whyusImage";
import { WhyusImage } from "@prisma/client";
import DeleteImageFromWhyus from "./DeleteImageFromWhyus";
type InitialStateType = {
  message?: string;
  error?: validationErrors;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};
const Form = ({
  whyudid,
  whyusImage,
  sectionId,
}: {
  whyudid: string;
  whyusImage: WhyusImage[];
  sectionId: string;
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [state, action, pending] = useActionState(
    addwhyusImage.bind(null, { whyudid: whyudid || "" }),
    initialState
  );
  useEffect(() => {
    if (state.message) {
      toast.success(state.message, {
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
      setSelectedImage("");
    }
  }, [state.message, state.status]);
  return (
    <div>
      {whyusImage.length < 5 && (
        <form action={action} className="space-y-4">
          <UploadImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "جار الرفع..." : "رفع الصوره"}
          </Button>
        </form>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {whyusImage.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <Image
                src={image.url}
                alt="صورة المعرض"
                fill
                className="object-cover"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
            >
              <DeleteImageFromWhyus
                whyudImageid={image.id}
                sectionId={sectionId}
                publicId={image.publicId || ""}
                whyudid={whyudid}
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
const UploadImage = ({
  setSelectedImage,
  selectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  selectedImage: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image" // Important: allows FormData to pick it up
      />
      {!selectedImage ? (
        <label
          htmlFor="image-upload"
          className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-primary text-primary rounded-xl cursor-pointer hover:bg-primary/10 transition"
        >
          <CameraIcon className="w-8 h-8" />
        </label>
      ) : (
        <label htmlFor="image-upload" className="cursor-pointer">
          <Image
            src={selectedImage as string}
            alt="Preview"
            width={192}
            height={192}
            className="object-cover rounded-xl border"
          />
        </label>
      )}
    </div>
  );
};
