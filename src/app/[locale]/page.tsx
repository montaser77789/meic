import ContactSection from "./_components/ContactSection";
import HeroSection from "./_components/HeroSection";
import Numbers from "./_components/Numbers";
import OurPartners from "./_components/OurPartners";
import OurWorks from "./_components/OurWorks";
import OverSection from "./_components/OverSection";
import Question from "./_components/Question";
import Sections from "./_components/Sections";
import Whyus from "./_components/Whyus";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OurPartners />
      <Sections />
      <OverSection />
      <OurWorks />
      <Whyus />
      <Numbers />
      <Question />
      <ContactSection />
    </main>
  );
}
