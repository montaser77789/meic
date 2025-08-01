"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";


import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import Image from "next/image";
import {  buttonVariants } from "@/components/ui/button";
import Sectiontitle from "@/components/ui/Section-title";
import { Translations } from "@/components/types/Translationx";
import Link from "@/components/link/Link";
import { Locale } from "@/i18n.config";


interface sections {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  slug: string;
}

export default function Sections({
  translation,
  locale,
  sections
}: {
  translation: Translations;
  locale: Locale;
  sections: sections[]
}) {
  return (
    <section id="sections" className="container section-gap relative">
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
                src={section.image}
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

                  {/* <Button className="w-full rounded-full">اعرف المزيد</Button> */}
                  <Link
                    className={`w-full rounded-full ${buttonVariants({
                      variant: "default",
                    })}`}
                    href={`/${locale}/${section.id}`}
                  >
                    اعرف المزيد
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev !top-auto  after:!text-white after:!text-2xl"></div>
        <div className="swiper-button-next !top-auto  after:!text-white after:!text-2xl"></div>
      </Swiper>
    </section>
  );
}
