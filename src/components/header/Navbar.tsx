"use client";
import React, { useRef, useState, useEffect } from "react";
import { Translations } from "../types/Translationx";
import { Locale } from "@/i18n.config";
import { Menu, XIcon } from "lucide-react";
import { Languages, Routes } from "../constants/enum";
import { Button } from "../ui/button";
import LanguageSwitcher from "./language-switcher";
import { usePathname } from "next/navigation";
import Link from "../link/Link";
import AOS from "aos";
import { Session } from "next-auth";

import "aos/dist/aos.css";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaArrowDown } from "react-icons/fa";
import { useClientSession } from "@/hooks/useClientSession";
interface Section {
  id: number;
  title: string;
}
const Navbar = ({
  sections,
  translations,
  locale,
  initialSession,
}: {
  sections: Section[];
  translations: Translations;
  locale: Locale;
  initialSession: Session | null;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const session = useClientSession(initialSession);
  console.log(session);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-quad",
      once: true,
    });
  }, []);

  const links = [
    {
      id: 1,
      title: translations.navbar.home,
      href: `/${locale}`,
    },
    {
      id: 2,
      title: translations.navbar.about,
      href: `/${locale}/#whyus`,
    },
    {
      id: 3,
      title: translations.navbar.ourwork,
      href: `/${locale}/#sections`,
    },
  ];

  return (
    <nav>
      {/* Hamburger menu button */}
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>

      {/* Mobile menu with AOS animations */}
      {openMenu && (
        <div
          className="fixed inset-0 z-50 bg-primary/90 backdrop-blur-sm lg:hidden"
          data-aos="fade-left"
        >
          <ul className="h-full flex flex-col items-center justify-center gap-8 relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-6 right-6 text-white hover:bg-white/10"
              onClick={() => setOpenMenu(false)}
            >
              <XIcon className="!w-8 !h-8" />
            </Button>

            {/* Menu links with staggered animation */}
            {links.map((link, index) => (
              <li key={link.id} data-aos="fade-up" data-aos-delay={50 * index}>
                <Link
                  onClick={() => setOpenMenu(false)}
                  className={`text-xl lg:text-md font-semibold hover:text-primary duration-200 transition-colors ${
                    pathname === link.href ? "text-blue-500" : "text-white"
                  }`}
                  href={link.href}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {/* Services dropdown */}
            <li data-aos="fade-up" data-aos-delay={50 * links.length}>
              <Services
                sections={sections}
                locale={locale}
                translations={translations}
                mobile
              />
            </li>

            {/* Language switcher */}
            <li
              data-aos="fade-up"
              data-aos-delay={50 * (links.length + 1)}
              className="mt-8"
            >
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center justify-center gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className={`font-semibold text-xl hover:text-primary duration-200 transition-colors ${
                pathname === link.href
                  ? "text-primary"
                  : pathname.includes("admin")
                  ? "text-black"
                  : "text-white"
              }`}
              href={link.href}
            >
              {link.title}
            </Link>
          </li>
        ))}
        {session.data?.user && (
          <li>
            <Link
              href={`/${locale}/${Routes.ADMIN}`}
              onClick={() => setOpenMenu(false)}
              className={`font-semibold hover:text-primary duration-200 transition-colors ${
                pathname === `/${locale}/${Routes.ADMIN}`
                  ? "text-primary"
                  : "text-white"
              }`}
            >
              {translations.navbar.admin}
            </Link>
          </li>
        )}
        <li>
          <Services
            sections={sections}
            locale={locale}
            translations={translations}
          />
        </li>
      </ul>
    </nav>
  );
};

const Services = ({
  sections,
  locale,
  translations,
  mobile = false,
}: {
  sections: Section[];
  locale: Locale;
  translations: Translations;
  mobile?: boolean;
}) => {
  const isArabic = locale === Languages.ARABIC;
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const pathname = usePathname();

  if (mobile) {
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={() => setOpen(!open)}
          className={`!text-black border-none text-md font-semibold outline-none cursor-pointer flex items-center !gap-3 ${
            pathname.includes("admin") ? "!text-black" : "!text-white"
          }`}
        >
          {translations.navbar.services}
          <span
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <FaArrowDown />
          </span>
        </button>

        {open && (
          <ul
            className="overflow-hidden space-y-4 mt-4 text-center"
            data-aos="fade-up"
          >
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  className={`font-semibold hover:text-primary duration-200 transition-colors cursor-pointer !text-white}`}
                  href={`/${locale}/${section.id}`}
                >
                  {section.title.split("…")[0]}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <PopoverTrigger asChild>
          <button
            onClick={() => setOpen(!open)}
            className={` border-none text-md font-semibold outline-none cursor-pointer flex items-center !gap-3 ${
              pathname.includes("admin") ? "!text-black" : "!text-white"
            }`}
          >
            {translations.navbar.services}
            <span
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            >
              <FaArrowDown />
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto" sideOffset={5}>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  className={`font-semibold text-nowrap  duration-200 transition-colors cursor-pointer  text-primary hover:text-secondary`}
                  href={`/${locale}/${section.id}`}
                >
                  {section.title.split("…")[0]}
                </Link>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default Navbar;
