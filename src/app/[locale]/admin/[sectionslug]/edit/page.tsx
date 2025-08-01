import { Locale } from "@/i18n.config";
import { getSection, getSectionBySlug } from "@/server/db/getSection";
import React from "react";
import Form from "../../_components/Form";
import { Section } from "@prisma/client";
export async function generateStaticParams() {
  const sections = await getSection({ role: "admin", locale: "ar" });

  return sections.map((section: Section) => ({
    sectionslug: section.slug,
  }));
}

export default async function page({
  params,
}: {
  params: Promise<{ sectionid: string; locale: Locale }>;
}) {
  const { sectionid: sectionslug } = await params;
  const section = await getSectionBySlug({
    role: "admin",
    locale: "ar",
    id: sectionslug,
  });
  return (
    <main className="container mx-auto p-4 Navbar-gap mt-16">
      <h1 className="text-2xl md:text-5xl font-bold text-primary py-2 text-center">
        اضافة قسم
      </h1>
      <Form section={section} />
    </main>
  );
}
