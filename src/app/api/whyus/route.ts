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

  const data = await db.whyusSection.findMany({
    where: { sectionId },

    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(data);
}
