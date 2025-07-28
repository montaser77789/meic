import Sectiontitle from "@/components/ui/Section-title";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const questions = [
  {
    id: 1,
    question: "كيف أطلب عرض سعر أو استشارة ؟",
    answer: "يمكنك التواصل معنا عبر الواتساب او البريد الاكتروني ",
  },
  {
    id: 2,
    question: "هل تقدمون خدماتكم في المملكة كلها ؟",
    answer: "نعم نقدم خدماتنا في المملكة كلها",
  },
  {
    id: 3,
    question: "كم تستغرق مدة تنفيذ المشروع ؟",
    answer: "من 3 إلى 6 شهور",
  },
  {
    id: 4,
    question: "هل يمكن تنفيذ أكثر من خدمة معًا",
    answer: "نعم يمكننا تنفيذ اكثر من خدمة معًا",
  },
  {
    id: 5,
    question: "هل خدماتكم تشمل ضمان أو صيانة لاحقة؟",
    answer: "نعم نقدم خدماتنا مع ضمان وصيانة لاحقة",
  },
  {
    id: 6,
    question: "ما أنواع العملاء اللي تتعاملون معهم؟",
    answer:
      "جمعنا لك أهم العملاء اللي تتعاملون معهم، وحرصنا نجاوب عليها بكل وضوح",
  },
];

const Question = () => {
  return (
    <section className="section-gap ">
      <div className="container">
        <Sectiontitle
          title="أسئلة يطرحها عملاؤنا كثيرًا"
          description="جمعنا لك أهم الأسئلة اللي نسمعها من عملائنا، وحرصنا نجاوب عليها بكل وضوح"
        />

        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          defaultValue="item-1"
        >
          {questions.map((item) => (
            <AccordionItem
              value={item.id.toString()}
              key={item.id}
              className="bg-[#EFEFEF] px-4 py-5 rounded-2xl"
            >
              <AccordionTrigger className="text-primary text-lg md:text-2xl cursor-pointer ">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="text-sm md:text-base">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Question;
