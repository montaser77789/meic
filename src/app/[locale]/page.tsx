import { getCurrentLocale } from "@/lib/getCurrentLocale";
import ContactSection from "./_components/ContactSection";
import HeroSection from "./_components/HeroSection";
import Numbers from "./_components/Numbers";
import OurPartners from "./_components/OurPartners";
import OurWorks from "./_components/OurWorks";
import OverSection from "./_components/OverSection";
import Question from "./_components/Question";
import Sections from "./_components/Sections";
import Whyus from "./_components/Whyus";
import getTrans from "@/lib/translation";
import { getSection } from "@/server/db/getSection";

export default async function Home() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const section = await getSection({ role: "user", locale: locale });

  return (
    <main>
      <HeroSection translation={translations} />
      <OurPartners translation={translations} />
      {section.length > 0 && (
        <Sections
          sections={section}
          locale={locale}
          translation={translations}
        />
      )}
      <OverSection translation={translations} />
      {section.length > 0 && (
        <OurWorks section={section} translation={translations} />
      )}
      <Whyus translation={translations} />
      <Numbers translation={translations} />
      <Question translation={translations} />
      <ContactSection translation={translations} />
    </main>
  );
}
