"use client";

import { Pages, Routes } from "@/components/constants/enum";
import Link from "@/components/link/Link";
import { Locale } from "@/i18n.config";
import { LayoutDashboard, ListOrdered } from "lucide-react";
import { usePathname } from "next/navigation";
import { MdOutlineMiscellaneousServices } from "react-icons/md";

function AdminSidepar({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const tabs = [
    {
      name: "الاقسام",
      href: `/${locale}/${Routes.ADMIN}`,
      icon: ListOrdered,
    },
    {
      name: "الخدمات",
      href: `/${locale}/${Routes.ADMIN}/${Pages.SERVICES}`,
      icon: MdOutlineMiscellaneousServices,
    },
    {
      name: "الاسئله",
      href: `/${locale}/${Routes.ADMIN}/${Pages.questions}`,
      icon: MdOutlineMiscellaneousServices,
    },
    {
      name: "معرض الصور",
      href: `/${locale}/${Routes.ADMIN}/${Pages.GALLERIES}`,
      icon: MdOutlineMiscellaneousServices,
    },
    {
      name: "لماذا نحن",
      href: `/${locale}/${Routes.ADMIN}/${Pages.WHYUS}`,
      icon: MdOutlineMiscellaneousServices,
    },
  ];

  return (
    <div className="Navbar-gap h-full">
      <Link
        href={`/${locale}/${Routes.ADMIN}`}
        className="flex items-center text-lg lg:text-2xl font-bold m-5 py-5 mt-16"
      >
        <LayoutDashboard className="w-4 h-4 ml-2 " />
        <span className="hidden lg:block">لوحة التحكم</span>
      </Link>

      <ul className=" flex items-center justify-center flex-col lg:items-start">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            className={`flex items-center text-xl w-full  lg:border-b  border border-black p-1 lg:p-4
              ${
                pathname === `${tab.href}` ? "bg-secondary" : "bg-transparent"
              }`}
            href={tab.href}
          >
            <tab.icon className="w-4 h-4 ml-2" />
            <span className="hidden lg:block">{tab.name}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidepar;
