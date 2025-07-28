import { Button } from "@/components/ui/button";
import React from "react";

const ContactSection = () => {
  return (
    <section className="bg-[#F5F5F5] pt-20">
      <div className="container">

        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-primary">
            جاهزين نسمعك ونساعدك.. تواصل معانا بخطوة واحدة
          </h2>
          <p className="text-lg md:text-2xl mt font-medium text-[#000000] mt-8">
            من حفر اول متر فى الأرض لحد ما مشروعك يشتغل بكفاءة تامة – بنقدم
            خدماتنا في حفر الآبار، المقاولات، التكييف، تأجير المعدات، بيع العدد،
            وإدارة الأعمال والتشغيل. نشتغل معاك خطوة بخطوة، وتواصلك هو البداية.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-10">
          <Button className="rounded-full">تواصل الأن</Button>
          <Button variant={"outline"} className="rounded-full">
            اطلب مكالمة
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
