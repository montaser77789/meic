"use client";

import Sectiontitle from "@/components/ui/Section-title";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ProjectsGalleryProps = {
  title: string;
  description: string;
  images: string[]; // بدل StaticImageData[]
};


const ProjectsGallerySection = ({
  title,
  description,
  images,
}: ProjectsGalleryProps) => {
  // نقسم الصور إلى مجموعات من 6 صور في كل slide
  const chunkedImages = [];
  for (let i = 0; i < images.length; i += 6) {
    chunkedImages.push(images.slice(i, i + 6));
  }

  return (
    <section className="py-16 bg-[#f8f8f8] text-right">
      <div className="container mx-auto ">
        <Sectiontitle title={title} description={description} />

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            dir="rtl"
            spaceBetween={24}
            className="mt-10"
          >
            {chunkedImages.map((group, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {group.map((img, i) => (
                    <div
                      key={i}
                      className="w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] relative"
                    >
                      <Image
                        src={img}
                        alt={`مشروع ${i + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* الأسهم المخصصة */}
          <div className="swiper-button-next !top-auto !right-[50px]  after:!text-white after:!text-2xl"></div>
          <div className="swiper-button-prev !top-auto !left-[50px]  after:!text-white after:!text-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallerySection;
