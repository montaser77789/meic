"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Languages } from "../constants/enum";
import { Button } from "../ui/button";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div className="flex">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => switchLanguage(locale === Languages.ARABIC ? Languages.ENGLISH : Languages.ARABIC)}
        className="rounded-full hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800 cursor-pointer"
        aria-label="Toggle language"
      >
        {/* الخيار 1: أيقونة لغة عامة */}
        {/* <LanguagesIcon className="h-5 w-5" /> */}
        
        {/* الخيار 2: أيقونات أعلام (تتطلب تثبيت حزمة إضافية) */}
        {/* {locale === Languages.ARABIC ? (
          <span className="text-xl">🇬🇧</span> // علم بريطانيا
        ) : (
          <span className="text-xl">🇸🇦</span> // علم السعودية
        )} */}
        
        {/* الخيار 3: نص مختصر مع أيقونة */}
        <div className="flex items-center gap-1 hover:text-primary  text-white ">
          {locale === Languages.ARABIC ? 'EN' : 'AR'}
        </div>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;