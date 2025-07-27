import "server-only";

import { Locale } from "@/i18n.config";
import { Languages } from "@/components/constants/enum";

const dictionaries = {
  ar: () => import("@/components/dictionaries/ar.json").then((module) => module.default),
  en: () => import("@/components/dictionaries/en.json").then((module) => module.default),
};

const getTrans = async (locale: Locale) => {
  return locale === Languages.ARABIC ? dictionaries.ar() : dictionaries.en();
};

export default getTrans;
