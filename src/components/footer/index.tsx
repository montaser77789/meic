"use client";

import Image from "next/image";
import {
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaNewspaper,
} from "react-icons/fa";
import Link from "../link/Link";
import logo from "../../../public/favicon.png";
import { Translations } from "@/components/types/Translationx";

const Footer = ({ translation }: { translation: Translations }) => {
  return (
    <footer className="bg-[#4E4E4E] text-white py-10 rounded-t-3xl container">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm ">
        {/* عمود الشركة */}
        <div className="space-y-3 col-span-1">
          <div className="w-24 h-auto">
            <Image src={logo.src} alt="logo" width={100} height={100} />
          </div>
          <p className="text-xs leading-6 text-gray-200">
            {translation.footer.about}
          </p>
        </div>

        {/* روابط الشركة */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">
            {translation.footer.company.title}
          </h4>
          <ul className="space-y-1">
            {translation.footer.company.links.map((item, i) => (
              <li key={i}>
                <Link href="#">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* الخدمات */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">
            {translation.footer.services.title}
          </h4>
          <ul className="space-y-1">
            {translation.footer.services.items.map((service, i) => (
              <li key={i}>{service}</li>
            ))}
          </ul>
        </div>

        {/* الشهادات */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">
            {translation.footer.certificates.title}
          </h4>
          <ul className="space-y-1">
            {translation.footer.certificates.items.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>

        {/* تابعنا */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">
            {translation.footer.follow.title}
          </h4>
          <ul className="space-y-2">
            {translation.footer.follow.links.map((item, i) => (
              <li key={i} className="flex items-center gap-2 justify-start">
                <span>{item.label}</span>
                {item.icon === "linkedin" && <FaLinkedin className="text-blue-400" />}
                {item.icon === "youtube" && <FaYoutube className="text-red-500" />}
                {item.icon === "instagram" && <FaInstagram className="text-pink-500" />}
                {item.icon === "news" && <FaNewspaper className="text-blue-300" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
