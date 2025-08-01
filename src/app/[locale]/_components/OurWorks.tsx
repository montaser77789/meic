"use client";
import { Button } from "@/components/ui/button";
import Sectiontitle from "@/components/ui/Section-title";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Translations } from "@/components/types/Translationx";
import { GalleryImage } from "@prisma/client";
interface Section {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  slug: string;
}
const OurWorks = ({
  translation,
  section,
}: {
  translation: Translations;
  section: Section[];
}) => {
  const [activeTab, setActiveTab] = useState(section[0].id);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const tabs = section;
  console.log(images);

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
  }, [selectedSectionId]);
  <Image
    width={500}
    height={500}
    src={images[0]?.url ?? ""}
    alt="img1"
    className="w-full h-full object-cover rounded-2xl"
  />;

  return (
    <section className="section-gap">
      <div className="container">
        <Sectiontitle
          title={translation.ourwork.title}
          description={translation.ourwork.description}
        />
        <div>
          <div className="flex items-center justify-between gap-4 w-full mt-3 flex-nowrap overflow-auto max-w-4xl m-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedSectionId(tab.id);
                }}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`text-lg rounded-full  ${
                  tab.id === activeTab ? "active" : ""
                }`}
              >
                {tab.title.split("…")[0]}
              </Button>
            ))}
          </div>
        </div>
        {images.length < 7 && (
          <p className="text-center text-gray-500 mt-4">
            عدد الصور غير كافٍ لعرض المعرض الكامل
          </p>
        )}

        {images.length >= 7 && (
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 md:grid-rows-2  gap-4 p-4 md:h-[532px]">
            {/* العمود 1 - صورة كبيرة تأخذ صفين */}
            <div className="grid grid-rows-3 gap-4 row-span-2">
              <Image
                width={500}
                height={500}
                src={images[0]?.url ?? ""}
                alt="img1"
                className="w-full h-full object-cover rounded-2xl"
              />
              <Image
                width={500}
                height={500}
                src={images[1]?.url ?? ""}
                alt="img1"
                className="w-full h-full object-cover rounded-2xl "
              />
              <Image
                width={500}
                height={500}
                src={images[2]?.url ?? ""}
                alt="img1"
                className="w-full h-full object-cover rounded-2xl "
              />
            </div>

            {/* العمود 2 - صورة طويلة تأخذ صفين */}
            <div className="row-span-2 rounded-xl overflow-hidden">
              <Image
                width={500}
                height={500}
                src={images[3]?.url ?? ""}
                alt="img1"
                className="w-full h-full object-cover rounded-2xl "
              />
            </div>

            {/* العمود 3 - صف 1 */}
            <div className="rounded-xl overflow-hidden">
              <Image
                width={500}
                height={500}
                src={images[4]?.url ?? ""}
                alt="img1"
                className="w-full h-full object-cover rounded-2xl "
              />
            </div>

            {/* العمود 3 - صف 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src={images[5]?.url ?? ""}
                  alt="img1"
                  className="w-full h-full object-cover rounded-2xl "
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-gray-200">
                <Image
                  width={500}
                  height={500}
                  src={images[6]?.url ?? ""}
                  alt="img1"
                  className="w-full h-full object-cover rounded-2xl "
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurWorks;
