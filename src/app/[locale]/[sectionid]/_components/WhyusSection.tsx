import Sectiontitle from "@/components/ui/Section-title";
import React from "react";
import Image from "next/image";
import {
  GalleryImage,
  WhyusPoint,
  WhyusSection as WhyusSectionType,
} from "@prisma/client";
import { Locale } from "@/i18n.config";

type WhyusProps = {
  locale: Locale;
  WhyusData: (WhyusSectionType & {
    WhyusImage: GalleryImage[];
    points: WhyusPoint[];
  })[];
};

const WhyusSection = ({ WhyusData, locale }: WhyusProps) => {
  return (
    <section className="py-16">
      <div className="container">
        {WhyusData.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {/* القسم الأيمن - العنوان والصور */}
            <div>
              <div className="text-right">
                <Sectiontitle
                  title={locale === "ar" ? item.heading_ar : item.heading_en}
                  description={
                    locale === "ar" ? item.subheading_ar : item.subheading_en
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-3 grid-rows-2 h-[407px] mt-3">
                {/* الصور */}
                {item.WhyusImage.length >= 4 ? (
                  <>
                    <div className="row-span-2 rounded-xl overflow-hidden">
                      <Image
                        src={item.WhyusImage[0].url}
                        alt="img1"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>

                    <div className="space-y-3">
                      <Image
                        src={item.WhyusImage[1].url}
                        alt="img2"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <Image
                        src={item.WhyusImage[2].url}
                        alt="img3"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>

                    <div className="row-span-2 rounded-xl overflow-hidden">
                      <Image
                        src={item.WhyusImage[3].url}
                        alt="img4"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-red-500 col-span-3">
                    لم يتم توفير العدد الكافي من الصور (4 صور مطلوبة)
                  </p>
                )}
              </div>
            </div>

            {/* القسم الأيسر - النقاط */}
            <div className="">
              {item.points.map((point, index) => (
                <div
                  key={point.id}
                  className="flex items-start space-x-3 space-x-reverse mb-6 gap-3"
                >
                  <span className="bg-primary p-2 rounded-[5px] w-8 h-8 flex items-center justify-center  text-white">
                    {index + 1}
                  </span>
                  <div className="flex-1 space-y-1 md:space-y-2">
                    <h3 className="font-bold text-lg md:text-2xl">
                      {locale === "ar" ? point.title_ar : point.title_en}
                    </h3>
                    <p className="text-sm md:text-lg text-primary">
                      {locale === "ar" ? point.desc_ar : point.desc_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyusSection;
