import React from "react";
import bg1 from "../../../../public/over Section/27073df2c278996addddf291999cedab74adfb72.png";
import bg2 from "../../../../public/Sections/8f5589d1d9d1efd155d7621d2ed04fe115b11271.jpg";
import bg3 from "../../../../public/over Section/80d5f16f07b3580624d714be37163f6740fe5c75.jpg";
import bg4 from "../../../../public/over Section/9e8698b23051857e36353555cd79acd1fed92ac7.png";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { Translations } from "@/components/types/Translationx";

const OverSection = ({ translation }: { translation: Translations }) => {
  return (
    <section className="section-gap bg-[#F8F8F8]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 py-4">
          {/* العرض الأول */}
          <div className="relative h-[375px] z-10 lg:col-span-3">
            <div
              className="absolute top-0 left-0 right-0 bottom-0 z-[-1] rounded-4xl"
              style={{
                backgroundImage: `url(${bg2.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[-1] rounded-4xl"></div>
            <div className="flex gap-4 items-center justify-center h-full">
              <div
                className="absolute top-0 left-0 right-0 bottom-0 z-[-1] hidden lg:block"
                style={{
                  backgroundImage: `url(${bg1.src})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="text-white flex-1 px-4 font-bold space-y-5 z-50">
                <h2 className="text-2xl md:text-4xl">
                  {translation.overSection.offer1.title}
                </h2>
                <strong className="text-4xl md:text-6xl text-primary font-black">
                  {translation.overSection.offer1.discount}
                </strong>
                <p className="text-md md:text-xl font-medium">
                  {translation.overSection.offer1.description1}
                </p>
                <p className="text-md md:text-xl font-medium">
                  {translation.overSection.offer1.description2}
                </p>
                <Button className="md:w-auto rounded-full">
                  {translation.overSection.offer1.button}
                </Button>
              </div>
            </div>
          </div>

          {/* العرض الثاني */}
          <div className="relative h-[375px] z-10 lg:col-span-4">
            <div
              className="absolute top-0 left-0 right-0 bottom-0 z-[-1] rounded-4xl"
              style={{
                backgroundImage: `url(${bg3.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[-1] rounded-4xl"></div>
            <div className="flex gap-4 items-center justify-center h-full">
              <div
                className="absolute top-0 left-0 right-0 bottom-0 z-[-1] hidden lg:block"
                style={{
                  height: "100%",
                  backgroundImage: `url(${bg4.src})`,
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="text-white flex-1 px-4 font-bold space-y-5 z-50">
                <h2 className="text-2xl md:text-4xl">
                  {translation.overSection.offer2.title}
                </h2>
                <p className="text-md md:text-xl font-medium">
                  {translation.overSection.offer2.description}
                </p>
                <ul className="text-md font-medium space-y-2">
                  {translation.overSection.offer2.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="bg-primary w-6 h-6 flex items-center justify-center rounded-full">
                        <FaCheck className="text-white" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Button className="md:w-auto rounded-full">
                  {translation.overSection.offer2.button}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverSection;
