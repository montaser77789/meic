import Sectiontitle from "@/components/ui/Section-title";
import patern1 from "../../../../public/Our paterns/5c53d1fd5e9e90ad4a6d911647222cac35f4d652.png";
import patern2 from "../../../../public/Our paterns/b6883b850054f5d320dd93800ba0a10c25907e7f.png";
import patern3 from "../../../../public/Our paterns/c4711c5e5946ca56db33ce16f78e2703e4d66a22.png";
import patern4 from "../../../../public/Our paterns/e5d782175f11c752015c3f42572bf63982e41f7e.png";
import Image from "next/image";
import { Translations } from "@/components/types/Translationx";

const OurPartners = ({ translation }: { translation: Translations }) => {
  return (
    <section className="section-gap container">
      <Sectiontitle
        title={translation.ourpatners.title}
        description={translation.ourpatners.description}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Image src={patern4} alt="patern4" width={300} height={300} />
        <Image src={patern1} alt="patern1" width={300} height={300} />
        <Image src={patern2} alt="patern2" width={300} height={300} />
        <Image src={patern3} alt="patern3" width={300} height={300} />
      </div>
    </section>
  );
};

export default OurPartners;
