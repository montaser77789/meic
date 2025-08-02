import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import React from "react";
import HeroSections from "./_components/HeroSections";
import ServicesSection from "./_components/ServicesSection";
import WhyusSection from "./_components/WhyusSection";
import ProjectsGallerySection from "./_components/ProjectsGallerySection";
import { getSectionBySlug } from "@/server/db/getSection";
import { gerServicesBySectionId } from "@/server/db/services";
import { GalleryImage } from "@prisma/client";
import { getWhyUsBysectionId } from "@/server/db/whyusimage";
import { getQuestion } from "@/server/db/getquestions";
import Question from "../_components/Question";
import ContactSection from "../_components/ContactSection";
import Equipment from "./_components/Equipment";

export default async function page({
  params,
}: {
  params: Promise<{ sectionid: string; locale: Locale }>;
}) {
  const { sectionid: sectionname } = await params;
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  const section = await getSectionBySlug({
    role: "user",
    locale: locale,
    id: sectionname,
  });
  const services = await gerServicesBySectionId({
    role: "user",
    locale,
    sectionId: section.id,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sectionId: section.id }),
  });
  const imagesData = await res.json();
  const imageUrls = imagesData.map((img: GalleryImage) => img.url);

  const WhyusData = await getWhyUsBysectionId({
    locale,
    sectionId: section.id,
  });
  const question = await getQuestion({
    role: "user",
    locale,
    sectionId: section.id,
  });
  console.log(question);

    const equipment = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/equipmentcatagory`,
    {
      method: "POST",
      body: JSON.stringify({
        role: "admin",
        sectionId: section.id,
        locale: "ar",
      }),
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
  console.log(equipment);

  return (
    <div>
      <HeroSections sections={section} translation={translations} />

      {equipment.length > 0 && <Equipment translations={translations} equipments={equipment} locale={locale} />}
      {services.length > 0 && (
        <ServicesSection services={services} locale={locale} />
      )}
      {WhyusData.length > 0 && (
        <WhyusSection WhyusData={WhyusData} locale={locale} />
      )}
      {imageUrls.length > 0 && (
        <ProjectsGallerySection
          title={translations.projects.title}
          description={translations.projects.description}
          images={imageUrls}
        />
      )}
      {question.length > 0 && (
        <Question translation={translations} questions={question} />
      )}{" "}
      <ContactSection translation={translations} />
    </div>
  );
}
