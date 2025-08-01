"use client";
import { useActionState, useEffect, useRef, useState } from "react";

import { CameraIcon } from "lucide-react";
import { toast } from "sonner";
import { validationErrors } from "@/validation/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GalleryImage, Section } from "@prisma/client";
import { SelectedSectionId } from "../../_components/SelectedSectionId";
import { addourworkImage } from "../_action/gallary";
import DeleteImageFromOurWork from "./DeleteImageFromOurWork";
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

const Form = ({ section }: { section: Section[] }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [images, setImages] = useState<GalleryImage[]>([]);

  console.log(selectedImage);

  const [state, action, pending] = useActionState(
    addourworkImage.bind(null, { sectionId: selectedSectionId || "" }),
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

  useEffect(() => {
    const fetchImages = async () => {
      if (!selectedSectionId) return;

      try {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionId: selectedSectionId }),
        });

        const data = await res.json();
        if (res.ok) {
          setImages(data);
        } else {
          console.error("فشل في جلب الصور:", data.error);
        }
      } catch (err) {
        console.error("فشل في جلب الصور:", err);
      }
    };

    fetchImages();
  }, [selectedSectionId, state.status , state.message , images] ); // نعيد الجلب بعد الرفع

  return (
    <div className=" mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-primary mb-4">
        رفع الصوره الي معرض الصور
      </h2>

      <SelectedSectionId
        section={section as Section[]}
        setSelectedSectionId={setSelectedSectionId}
      />

      <form action={action} className="space-y-4">
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "جار الرفع..." : "رفع الصوره"}
        </Button>
      </form>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (
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
              <DeleteImageFromOurWork
                
                sectionId={selectedSectionId || ""}
                id={image.id}
                publicId={image.publicId ?? ""}
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
