"use client";
import Sectiontitle from "@/components/ui/Section-title";
import React, { useEffect, useState } from "react";
import { MdHandyman } from "react-icons/md";
import Image from "next/image";
import { Equipment as EquipmentType, EquipmentCategory } from "@prisma/client";
import { Locale } from "@/i18n.config";
import { Button } from "@/components/ui/button";
import { Translations } from "@/components/types/Translationx";

const Equipment = ({
  equipments,
  locale,
  translations,
}: {
  equipments: (EquipmentCategory & { equipments: EquipmentType[] })[];
  locale: Locale;
  translations: Translations;
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [equipment, setEquipment] = useState<EquipmentType[]>([]);

  // دمج كل المعدات من جميع الأقسام
  const allEquipments = equipments?.flatMap((cat) => cat.equipments);

  useEffect(() => {
    const fetchEquipment = async () => {
      if (!selectedSectionId) return;

      try {
        const res = await fetch("/api/getequipmentbycatagoryid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eqcatagoryid: selectedSectionId }),
        });

        const data = await res.json();
        if (res.ok) {
          setEquipment(data);
        } else {
          console.error("فشل في جلب العدد:", data.error);
        }
      } catch (err) {
        console.error("فشل في جلب العدد:", err);
      }
    };

    // لو مش محدد قسم (يعني "الكل") متجبش من API
    if (activeTab !== "all") {
      fetchEquipment();
    }
  }, [selectedSectionId, activeTab]);

  const displayedEquipment = activeTab === "all" ? allEquipments : equipment;

  return (
    <section className="py-4">
      <div className="container">
        <Sectiontitle
          title={translations.equipment.title}
          description={translations.equipment.description}
        />

        {/* التابات */}
        <div className="flex items-center justify-between gap-4 w-full mt-3 flex-nowrap overflow-auto max-w-4xl m-auto">
          {/* تابة الكل */}
          <Button
            key="all"
            onClick={() => {
              setActiveTab("all");
              setSelectedSectionId(null);
            }}
            variant={activeTab === "all" ? "default" : "outline"}
            className="text-lg rounded-full"
          >
            {translations.all}
          </Button>

          {equipments.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedSectionId(tab.id);
              }}
              variant={activeTab === tab.id ? "default" : "outline"}
              className="text-lg rounded-full"
            >
              {locale === "ar" ? tab.name_ar : tab.name_en}
            </Button>
          ))}
        </div>

        {/* عرض المعدات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {displayedEquipment.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center text-center rounded-2xl p-4 sm:p-2 relative mb-7"
            >
              <div className="w-full max-w-[150px] sm:max-w-none">
                <Image
                  src={item.image ?? "/placeholder.png"}
                  alt="equipment"
                  width={500}
                  height={500}
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </div>
              <div className="flex items-center justify-center z-50">
                <MdHandyman className="text-white w-[50px] h-[50px] rounded-full p-2 border-2 bg-[#006C35] border-white z-50 absolute bottom-[35px]" />
              </div>
              <div className="bg-[#006C35] text-white w-[80%] rounded-2xl py-2 mb-5 absolute bottom-[-50px]">
                <h2 className="text-md md:text-lg font-bold mt-3">
                  {locale === "ar" ? item.title_ar : item.title_en}
                </h2>
                <p className="text-md md:text-lg font-medium pb-1">
                  {locale === "ar" ? item.description_ar : item.description_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipment;
