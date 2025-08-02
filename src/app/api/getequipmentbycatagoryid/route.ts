import { db } from "@/server/db/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { eqcatagoryid } = await req.json();

    if (!eqcatagoryid) {
      return NextResponse.json({ error: "eqcatagoryid is required" }, { status: 400 });
    }

    const equipments = await db.equipment.findMany({
      where: { categoryId: eqcatagoryid },
    });
  
    return NextResponse.json(equipments);
  }

