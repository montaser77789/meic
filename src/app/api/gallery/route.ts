import { db } from "@/server/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sectionId } = await req.json();

  if (!sectionId) {
    return NextResponse.json({ error: "sectionId is required" }, { status: 400 });
  }

  const images = await db.galleryImage.findMany({
    where: { sectionId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(images);
}
