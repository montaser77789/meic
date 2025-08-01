import { db } from "@/server/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { role, locale, sectionId } = await req.json();

  const services = await db.services.findMany({ where: { sectionId } });

  if (role === "admin") {
    return NextResponse.json(services);
  }

  const filtered = services.map((service) => ({
    id: service.id,
    title: locale === "en" ? service.title_en : service.title_ar,
    description: locale === "en" ? service.desc_en : service.desc_ar,
  }));

  return NextResponse.json(filtered);
}
