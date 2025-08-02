import Image from "next/image";
import React from "react";
import logo from "../../../public/favicon.png";
import Navbar from "./Navbar";
import LanguageSwitcher from "./language-switcher";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import authOptions from "@/server/db/auth";
import { getSection } from "@/server/db/getSection";

const Header = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const initialSession = await getServerSession(authOptions);
  const section = await getSection({ role: "user", locale: locale });

  return (
    <header className="  absolute top-0 z-50 w-full">
      <div className="container py-4">
        <div className="flex items-center justify-between border-b-2 pb-3 border-primary">
          <div>
            <Image src={logo} alt="logo" width={70} height={70} priority />
          </div>
          <div>
            <Navbar
              sections={section}
              initialSession={initialSession}
              translations={translations}
              locale={locale}
            />
          </div>
          <div className="lg:flex items-center gap-4 hidden ">
    
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
