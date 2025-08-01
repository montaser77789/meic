import Sectiontitle from "@/components/ui/Section-title";
import React from "react";
import img1 from "../../../../public/our works/ab912a3989458410e305728b4af44322933f6c7e.jpg";
import img2 from "../../../../public/our works/b9822fd65676bea123dd4f7242c93a7b4ee54ddb.jpg";
import img3 from "../../../../public/our works/aa49197bec50e15807196efe5bf231e809aca62f.jpg";
import img4 from "../../../../public/our works/db67864e27200294965ac81501f0edcc7cd13194.jpg";
import Image from "next/image";
import { LuBrain } from "react-icons/lu";
import { MdOutlineBrowseGallery } from "react-icons/md";
import { MdOutlineHandyman } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { MdPhoneInTalk } from "react-icons/md";
import { Translations } from "@/components/types/Translationx";

const Whyus = ({ translation }: { translation: Translations }) => {
  const WhyusData = [
    {
      icon: LuBrain,
      title: translation.whyus.points[0].title,
      description: translation.whyus.points[0].description,
    },
    {
      icon: MdOutlineBrowseGallery,
      title: translation.whyus.points[1].title,
      description: translation.whyus.points[1].description,
    },
    {
      icon: MdOutlineHandyman,
      title: translation.whyus.points[2].title,
      description: translation.whyus.points[2].description,
    },
    {
      icon: MdOutlineVerified,
      title: translation.whyus.points[3].title,
      description: translation.whyus.points[3].description,
    },
    {
      icon: MdTravelExplore,
      title: translation.whyus.points[4].title,
      description: translation.whyus.points[4].description,
    },
    {
      icon: MdPhoneInTalk,
      title: translation.whyus.points[5].title,
      description: translation.whyus.points[5].description,
    },
  ];

  return (
    <section id="whyus" className="section-gap bg-[#f5f5f5] py-5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="!text-right">
              <Sectiontitle
                title={translation.whyus.title}
                description={translation.whyus.description}
              />
            </div>
            <div className="grid grid-cols-3 gap-3  grid-rows-2 h-[407px] mt-3">
              {/* العمود 2 - صورة طويلة تأخذ صفين */}
              <div className="row-span-2 rounded-xl overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src={img1}
                  alt="img1"
                  className="w-full h-full object-cover rounded-2xl "
                />
              </div>

              <div className="space-y-3">
                <Image
                  width={500}
                  height={500}
                  src={img2}
                  alt="img1"
                  className="w-full h-full object-cover rounded-2xl "
                />
                <Image
                  width={500}
                  height={500}
                  src={img4}
                  alt="img1"
                  className="w-full h-full object-cover rounded-2xl "
                />
              </div>

              {/* العمود 2 - صورة طويلة تأخذ صفين */}
              <div className="row-span-2 rounded-xl overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src={img3}
                  alt="img1"
                  className="w-full h-full object-cover rounded-2xl "
                />
              </div>
            </div>
          </div>

          <div className="">
            {WhyusData.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 mb-6 ">
                <span className="bg-primary p-2 rounded-[5px]">
                  {<item.icon className="text-white" />}
                </span>
                <div className="flex-1 space-y-1 md:space-y-2">
                  <h3 className="font-bold text-lg md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-lg text-primary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyus;
