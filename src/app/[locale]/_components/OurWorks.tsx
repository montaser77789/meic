"use client";
import { Button } from "@/components/ui/button";
import Sectiontitle from "@/components/ui/Section-title";
import { useState } from "react";
import Image from "next/image";
import img from "../../../../public/our works/aa49197bec50e15807196efe5bf231e809aca62f.jpg";
import img2 from "../../../../public/our works/ab912a3989458410e305728b4af44322933f6c7e.jpg";
import img3 from "../../../../public/our works/b9822fd65676bea123dd4f7242c93a7b4ee54ddb.jpg";
import img4 from "../../../../public/our works/db67864e27200294965ac81501f0edcc7cd13194.jpg";

const OurWorks = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    {
      id: 1,
      title: "الكل",
    },
    {
      id: 2,
      title: "حفر الآبار",
    },
    {
      id: 3,
      title: "المقاولات",
    },
    {
      id: 4,
      title: "التكييف",
    },
    {
      id: 5,
      title: "المعدات",
    },
    {
      id: 6,
      title: "العدد",
    },
    {
      id: 7,
      title: "التشغيل",
    },
  ];
  return (
    <section className="section-gap">
      <div className="container">
        <Sectiontitle
          title="أعمالنا على أرض الواقع"
          description="نفّذنا مشاريع متعددة في مختلف مجالاتنا  من حفر الآبار إلى تشغيل المنشآت بالتعاون مع جهات حكومية وخاصة، وبمعايير تنفيذ صارمة تضمن الاستدامة والجودة."
        />
        <div>
          <div className="flex items-center justify-between gap-4 w-full mt-3 flex-nowrap overflow-auto max-w-4xl m-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`text-lg rounded-full  ${
                  tab.id === 1 ? "active" : ""
                }`}
              >
                {tab.title}
              </Button>
            ))}
          </div>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 p-4"> */}

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 md:grid-rows-2  gap-4 p-4 md:h-[532px]">
          {/* العمود 1 - صورة كبيرة تأخذ صفين */}
          <div className="grid grid-rows-3 gap-4 row-span-2">
            <Image
              width={500}
              height={500}
              src={img2}
              alt="img1"
              className="w-full h-full object-cover rounded-2xl"
            />
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
              src={img2}
              alt="img1"
              className="w-full h-full object-cover rounded-2xl "
            />
          </div>

          {/* العمود 2 - صورة طويلة تأخذ صفين */}
          <div className="row-span-2 rounded-xl overflow-hidden">
            <Image
              width={500}
              height={500}
              src={img}
              alt="img1"
              className="w-full h-full object-cover rounded-2xl "
            />
          </div>

          {/* العمود 3 - صف 1 */}
          <div className="rounded-xl overflow-hidden">
            <Image
              width={500}
              height={500}
              src={img3}
              alt="img1"
              className="w-full h-full object-cover rounded-2xl "
            />
          </div>

          {/* العمود 3 - صف 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden">
              <Image
                width={500}
                height={500}
                src={img4}
                alt="img1"
                className="w-full h-full object-cover rounded-2xl "
              />
            </div>
            <div className="rounded-xl overflow-hidden bg-gray-200">
              <Image
                width={500}
                height={500}
                src={img4}
                alt="img1"
                className="w-full h-full object-cover rounded-2xl "
              />
            </div>
      
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default OurWorks;
