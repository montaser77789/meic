import Sectiontitle from "@/components/ui/Section-title";
import {
  MdOutlineHandyman,
  MdOutlineCalendarToday,
  MdGroups,
} from "react-icons/md";

const numberData = [
  {
    id: 1,
    number: "+500",
    icon: MdOutlineHandyman,
    title: "مشروع منفّذ",
    description: "خبرة عملية في تنفيذ مشاريع ناجحة تعكس جودة وكفاءة عالية",
  },
  {
    id: 2,
    icon: MdOutlineCalendarToday,
    number: "+20",
    title: "عامًا من التميز",
    description:
      "تقديم خدمات متكاملة بأعلى جودة وكفاءة، مع التزام دائم بالصيانة والإدارة المميزة لضمان رضا العملاء.",
  },
  {
    id: 3,
    icon: MdGroups,
    number: "+500",
    title: "عميل وشريك",
    description: "ثقة متبادلة وشراكات ناجحة تدعم نمونا وتوسعنا المستمر.",
  },
];

const Numbers = () => {
  return (
    <section className="py-5 ">
      <div className="container">
        <Sectiontitle title="أرقام تروي قصتنا" description="" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {numberData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center text-center  rounded-2xl p-4 space-y-3"
          >
            <div className="text-white bg-primary   w-[80px] h-[80px] flex items-center justify-center rounded-[10px]">
              <item.icon className="text-5xl  " />
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
