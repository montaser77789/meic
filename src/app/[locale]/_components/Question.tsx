import Sectiontitle from "@/components/ui/Section-title";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Translations } from "@/components/types/Translationx";

const Question = ({ translation }: { translation: Translations }) => {
  return (
    <section className="section-gap">
      <div className="container">
        <Sectiontitle
          title={translation.questions.title}
          description={translation.questions.description}
        />

        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          defaultValue="item-1"
        >
          {translation.questions.items.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
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
