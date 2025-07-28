"use client";

import Image from "next/image";
import {
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaNewspaper,
} from "react-icons/fa";
import Link from "../link/Link";
import logo from "../../../public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#4E4E4E] text-white py-10 rounded-t-3xl container">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm text-right">
        {/* عمود الشركة */}
        <div className="space-y-3 col-span-1">
          <div className="w-24 h-auto">
            {/* ضع مسار اللوجو هنا */}
            <Image src={logo.src} alt="logo" width={100} height={100} />
          </div>
          <p className="text-xs leading-6 text-gray-200">
            شركة متخصصة في خدمات الحفر والمقاولات العامة، التكييف، تأجير
            المعدات، بيع العدد، إدارة المشاريع والتشغيل. نشتغل بخبرة، دقة،
            واهتمام حقيقي بكل تفصيلة.
          </p>
        </div>

        {/* روابط الشركة */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">الشركة</h4>
          <ul className="space-y-1">
            <li>
              <Link href="#">الرئيسية</Link>
            </li>
            <li>
              <Link href="#">أقسامنا</Link>
            </li>
            <li>
              <Link href="#">أعمالنا</Link>
            </li>
            <li>
              <Link href="#">الأسئلة الشائعة</Link>
            </li>
          </ul>
        </div>

        {/* الخدمات */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">الخدمات</h4>
          <ul className="space-y-1">
            <li>حفر الآبار والمضخات</li>
            <li>المقاولات</li>
            <li>أنظمة التكييف والتبريد</li>
            <li>تأجير المعدات الثقيلة</li>
            <li>إدارة أعمال الصيانة</li>
          </ul>
        </div>

        {/* الشهادات */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">الشهادات</h4>
          <ul className="space-y-1">
            <li>ISO 9001 : 2015 - إدارة الجودة</li>
            <li>ISO14001 : 2015 - الإدارة البيئية</li>
            <li>ISO 45001 : 2018 - السلامة المهنية</li>
            <li>SASO - المواصفات السعودية</li>
            <li>CE - المطابقات الأوروبية</li>
          </ul>
        </div>

        {/* تابعنا */}
        <div className="space-y-2">
          <h4 className="text-[#0B964F] font-bold mb-2">تابعنا</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 justify-start">
              <span>شبكة المهنيين</span>
              <FaLinkedin className="text-blue-400" />
            </li>
            <li className="flex items-center gap-2 justify-start">
              <span>قناتنا التقنية</span>
              <FaYoutube className="text-red-500" />
            </li>
            <li className="flex items-center gap-2 justify-start">
              <span>معرض أعمالنا</span>
              <FaInstagram className="text-pink-500" />
            </li>
            <li className="flex items-center gap-2 justify-start">
              <span>آخر الأخبار</span>
              <FaNewspaper className="text-blue-300" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
