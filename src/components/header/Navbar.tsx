"use client";
import React, { useRef, useState } from "react";
import { Translations } from "../types/Translationx";
import { Locale } from "@/i18n.config";
import { Menu, XIcon } from "lucide-react";
import { Languages, Routes } from "../constants/enum";
import { Button } from "../ui/button";
import LanguageSwitcher from "./language-switcher";
import { usePathname } from "next/navigation";
import Link from "../link/Link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({
  translations,
  locale,
}: {
  translations: Translations;
  locale: Locale;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      id: 1,
      title: translations.navbar.home,
      href: `/${locale}`,
    },
    {
      id: 2,
      title: translations.navbar.about,
      href: `/${locale}/${Routes.about}`,
    },
    {
      id: 3,
      title: translations.navbar.ourwork,
      href: `/${locale}/${Routes.OURWORK}`,
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

      {/* Mobile menu with animations */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 bg-primary/90 backdrop-blur-sm lg:hidden"
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-full flex flex-col items-center justify-center gap-8 relative"
            >
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
                <motion.li
                  key={link.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    onClick={() => setOpenMenu(false)}
                    className={`text-xl lg:text-2xl font-semibold hover:text-primary duration-200 transition-colors ${
                      pathname === link.href ? "text-blue-500" : "text-white"
                    }`}
                    href={link.href}
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}

              {/* Services dropdown */}
              <motion.li
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * links.length }}
              >
                <Services locale={locale} translations={translations} mobile />
              </motion.li>

              {/* Language switcher */}
              <motion.li
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (links.length + 1) }}
                className="mt-8"
              >
                <LanguageSwitcher />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center justify-center gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className={`font-semibold text-xl  hover:text-primary duration-200 transition-colors ${
                pathname === link.href ? "text-primary" : "text-white"
              }`}
              href={link.href}
            >
              {link.title}
            </Link>
          </li>
        ))}
        <li>
          <Services locale={locale} translations={translations} />
        </li>
      </ul>
    </nav>
  );
};

const Services = ({
  locale,
  translations,
  mobile = false,
}: {
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

  if (mobile) {
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={() => setOpen(!open)}
          className="!text-white border-none text-2xl font-semibold outline-none cursor-pointer flex items-center !gap-3"
        >
          {translations.navbar.services}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaArrowDown />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-4 mt-4 text-center"
            >
              <li className="text-xl text-white/80 hover:text-primary">
                Service 1
              </li>
              <li className="text-xl text-white/80 hover:text-primary">
                Service 2
              </li>
              <li className="text-xl text-white/80 hover:text-primary">
                Service 3
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
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
          <button className="!text-white border-none text-md font-semibold outline-none cursor-pointer flex items-center !gap-3">
            {translations.navbar.services}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowDown />
            </motion.span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-32" sideOffset={5}>
          <ul className="space-y-2">
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
          </ul>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default Navbar;
