// components/ServicesSection.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Sectiontitle from "@/components/ui/Section-title";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Locale } from "@/i18n.config";
import { Service, Services } from "@prisma/client";

const ServicesSection = ({
  services,
  locale,
}: {
  services:(Services & { Services: Service[] })[];
  locale: Locale;
}) => {
  console.log(services);
  return (
    <section className="py-16 bg-[#f8f8f8] text-right">
      {services.map((services) => (
        <div key={services.id} className="container mx-auto ">
          <Sectiontitle
            description={locale === "ar" ? services.desc_ar : services.desc_en}
            title={locale === "ar" ? services.title_ar : services.title_en}
          />

          <Swiper
            className="mt-8"
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            dir="rtl"
          >
            {services.Services.map((service: Service, index: number) => (
              <SwiperSlide key={index}>
                <Card className="rounded-xl shadow-md overflow-hidden !p-0">
                  <div className="relative w-full h-[385px]">
                    <Image
                      src={service.image ?? ""}
                      alt={
                        locale === "ar" ? service.title_ar : service.title_en
                      }
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-xl"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-primary font-bold text-lg md:text-2xl mb-2">
                      {locale === "ar" ? service.title_ar : service.title_en}
                    </h3>
                    <p className="text-primary text-sm md:text-base leading-relaxed">
                      {locale === "ar" ? service.desc_ar : service.desc_en}
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
};

export default ServicesSection;
