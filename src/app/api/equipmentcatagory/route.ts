import { db } from "@/server/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sectionId } = await req.json();

  if (!sectionId) {
    return NextResponse.json(
      { error: "sectionId is required" },
      { status: 400 }
    );
  }

  const questions = await db.equipmentCategory.findMany({
    where: { sectionId },
    include: {
      equipments: true
    }
  });

  return NextResponse.json(questions);
}
