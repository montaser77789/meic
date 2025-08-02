import { Button } from "@/components/ui/button";
import React from "react";
import { Translations } from "@/components/types/Translationx";

const ContactSection = ({ translation }: { translation: Translations }) => {
  const phoneNumber = "966554097005"; // بدون 0 في البداية مع كود الدولة
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  return (
    <section className="bg-[#F5F5F5] py-20">
      <div className="container">
        <div className="text-center w-full md:max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-primary">
            {translation.contact.title}
          </h2>
          <p className="text-lg md:text-2xl mt font-medium text-[#000000] mt-8">
            {translation.contact.description}
          </p>
        </div>
        <div className="flex gap-4 mt-6 w-full md:max-w-4xl mx-auto">
          <Button className="rounded-full flex-1 !py-5 md:!py-6 text-xl md:text-2xl text-black">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              {translation.contact.button1}
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-full flex-1 !py-5 md:!py-6 text-xl md:text-2xl text-black"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              {translation.contact.button2}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
