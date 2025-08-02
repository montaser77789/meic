import { db } from "@/server/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { role, locale, equipmentcatagoryIa } = await req.json();

  const services = await db.equipment.findMany({ where: { categoryId: equipmentcatagoryIa } });

  if (role === "admin") {
    return NextResponse.json(services);
  }

  const filtered = services.map((service) => ({
    id: service.id,
    title: locale === "en" ? service.title_en : service.title_ar,
    description: locale === "en" ? service.description_en : service.description_ar,
    image : service.image
  }));

  return NextResponse.json(filtered);
}
