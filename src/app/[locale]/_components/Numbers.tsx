import { Translations } from "@/components/types/Translationx";
import Sectiontitle from "@/components/ui/Section-title";
import { JSX } from "react";
import {
  MdOutlineHandyman,
  MdOutlineCalendarToday,
  MdGroups,
} from "react-icons/md";

const iconsMap: { [key: string]: JSX.Element } = {
  MdOutlineHandyman: <MdOutlineHandyman className="text-5xl text-white" />,
  MdOutlineCalendarToday: <MdOutlineCalendarToday className="text-5xl text-white" />,
  MdGroups: <MdGroups className="text-5xl text-white" />,
};

const Numbers = ({ translation }: { translation: Translations }) => {
  return (
    <section className="py-5">
      <div className="container">
        <Sectiontitle
          title={translation.numbers.title}
          description=""
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {translation.numbers.items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center rounded-2xl p-4 space-y-3"
          >
            <div className="text-white bg-primary w-[80px] h-[80px] flex items-center justify-center rounded-[10px]">
              {iconsMap[item.icon]}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mt-3">
              {item.number}
            </h2>
            <h3 className="text-lg md:text-2xl font-bold">{item.title}</h3>
            <p className="text-sm md:text-base font-medium">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Numbers;
