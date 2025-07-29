"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import section1 from "../../../../public/Sections/a2616ed9d9e40ec0c576e7041f08c2d28e11d74d.jpg";
import section2 from "../../../../public/Sections/8f5589d1d9d1efd155d7621d2ed04fe115b11271.jpg";
import section3 from "../../../../public/Sections/fb34614acd1bebddb170d8a4290e23ef5757a2d4.jpg";
import section4 from "../../../../public/Sections/e4243b892e8d12fdfc8cfebf3758879661b11e7c.jpg";
import section5 from "../../../../public/Sections/01d4cb0a830390eaa40762a88bc92e6e1d4d3ec4.jpg";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Sectiontitle from "@/components/ui/Section-title";
import { Translations } from "@/components/types/Translationx";

const sections = [
  {
    img: section1,
    title: "حفر الآبار والمضخات",
    description:
      "نخدم القطاعين العام والخاص في حفر وتجهيز الآبار وتركيب أنظمة الضخ، بأعلى المعايير الفنية والبيئية.",
    features: ["خبرة في مختلف أنواع التربة", "تقنيات حديثة لضمان الكفاءة"],
  },
  {
    img: section2,
    title: "أنظمة التكييف والتبريد",
    description:
      "نقدم حلول متكاملة لتوريد وتركيب وصيانة أنظمة التكييف والتبريد، للمشاريع السكنية والتجارية والصناعية.",
    features: [
      "خبرة في الأنظمة المركزية والمنفصلة",
      "كفاءة عالية وتوفير في استهلاك الطاقة",
    ],
  },
  {
    img: section3,
    title: "تأجير المعدات الثقيلة",
    description:
      "نوفر معدات ثقيلة جاهزة للعمل في مختلف المشاريع، مع ضمان الجاهزية والصيانة المستمرة والدعم الفني السريع.",
    features: [
      "أسطول متنوع وحديث من المعدات",
      "استجابة فورية واستبدال عند الحاجة",
    ],
  },
  {
    img: section4,
    title: "المقاولات العامة",
    description:
      "ننفذ أعمال الحفر، الأساسات، البناء، والتشطيب للقطاعين العام والخاص، بجودة عالية والتزام صارم بالمعايير",
    features: ["فرق متخصصة لكل مرحلة", "تقنيات حديثة وجودة تنفيذ ممتازة"],
  },
  {
    img: section5,
    title: "بيع العدد اليدوية والكهربائية",
    description:
      "نوفر عدد أصلية عالية الجودة تناسب احتياجات الورش والمشاريع، مع ضمان الأداء والتحمّل.",
    features: [
      "أدوات معتمدة من أفضل العلامات التجارية",
      "استشارات لاختيار الأنسب لشغلك",
    ],
  },
];

export default function Sections({
  translation,
}: {
  translation: Translations;
}) {
  return (
    <div className="container section-gap relative">
      <Sectiontitle
        title={translation.sections.title}
        description={translation.sections.description}
      />

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        initialSlide={2}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Navigation]}
        className="h-[650px] mt-5"
      >
        {sections.map((section, index) => (
          <SwiperSlide
            key={index}
            className="!w-[320px] md:!w-[400px] !h-[650px] bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <Image
                src={section.img}
                alt={section.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <div className="text-white p-0 md:p-2 rounded-lg">
                  <h3 className="text-xl md:text-3xl font-bold mb-2">
                    {section.title}
                  </h3>
                  <p className="mb-4 text-sm md:text-xl">
                    {section.description}
                  </p>

                  <ul className="mb-4 space-y-2">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full rounded-full">اعرف المزيد</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev !top-auto  after:!text-white after:!text-2xl"></div>
        <div className="swiper-button-next !top-auto  after:!text-white after:!text-2xl"></div>
      </Swiper>
    </div>
  );
}
