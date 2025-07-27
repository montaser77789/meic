import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import Navbar from "./Navbar";
import LanguageSwitcher from "./language-switcher";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Button } from "../ui/button";

const Header = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <header className="  fixed top-0 z-50 w-full" >
      <div className="container py-4">
        <div className="flex items-center justify-between border-b-2 pb-3 border-primary">
          <div>
            <Image src={logo} alt="logo" width={100} height={100} priority />
          </div>
          <div>
            <Navbar translations={translations} locale={locale} />
          </div>
          <div className="lg:flex items-center gap-4 hidden ">
            <Button className="btn rounded-full">اتصل بنا</Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
