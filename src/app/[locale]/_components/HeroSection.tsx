"use client";
import React from "react";
import bgImage from "../../../../public/images/16fb6ac02ec32d408b1e2a37b4a78c241610b23b.jpg";
import imageSlider2 from "../../../../public/images/93952dc9cc684e057292c349c21618c5cfc4e9fb.jpg";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";
import { Translations } from "@/components/types/Translationx";

const HeroSection = ({ translation }: { translation: Translations }) => {
  const [selectedImage, setSelectedImage] = React.useState(bgImage);
  console.log(selectedImage);
  return (
    <section
      style={{
        backgroundImage: `url(${selectedImage.src})`,
      }}
      className="relative bg-cover bg-center min-h-screen bg-no-repeat"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"></div>

      <div className="container relative z-20">
        <h1 className="font-bold text-2xl md:text-4xl text-white pt-24">
          {translation.hero.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
          <div>
            <h2 className="font-normal text-xl md:text-3xl text-secondary leading-[30px] md:leading-[57px]">
              {translation.hero.description}
            </h2>
            <div className="flex gap-4 mt-6 w-full flex-wrap">
              <Button
                variant="secondary"
                className="rounded-full flex-1 !py-5 md:!py-6 text-xl md:text-2xl"
              >
                {translation.hero.button1}
              </Button>
              <Button
                variant="outline"
                className="rounded-full flex-1 !py-5 md:!py-6 text-xl md:text-2xl"
              >
                {translation.hero.button2}
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Carsoul setSelectedImage={setSelectedImage} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

const Carsoul = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<StaticImageData>>;
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  return (
    <Carousel
      dir="ltr"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
      }}
    >
      <CarouselContent>
        {[ imageSlider2  , bgImage].map(
          (img, index) => (
            <CarouselItem key={index} className="basis-2/3 md:basis-2/5">
              <div className="width-[500px] h-[200px]">
                <Image
                  onClick={() => setSelectedImage(img)}
                  src={img}
                  alt="slider"
                  className="rounded-2xl  object-cover cursor-pointer"
                />
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  );
};
