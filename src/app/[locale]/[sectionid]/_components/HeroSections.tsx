import { Translations } from "@/components/types/Translationx";
import React from "react";
import { Button } from "@/components/ui/button";

interface sections {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  slug: string;
}
const HeroSections = ({
  translation,
  sections,
}: {
  translation: Translations;
  sections: sections;
}) => {
  return (
    <section
      style={{
        backgroundImage: `url(${sections.image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="relative bg-cover bg-center min-h-screen bg-no-repeat"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"></div>

      <div className="container relative z-20">
        <h1 className="font-bold text-2xl md:text-4xl text-white pt-24">
          {sections.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
          <div>
            <h2 className="font-normal text-xl md:text-3xl text-secondary leading-[30px] md:leading-[57px]">
              {sections.description}
            </h2>
            <div className="flex gap-4 mt-6 w-full flex-wrap">
              {sections?.features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="w-4 h-4 rounded-full bg-primary"></span>
                  <h3 className="text-lg md:text-2xl font-bold text-white">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
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
      </div>
    </section>
  );
};

export default HeroSections;
