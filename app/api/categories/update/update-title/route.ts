import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { allowedActionMethod, getBodyData } from "@/app/api/_helpers";
import { CategoryTitleFormSchema } from "@/app/api/categories/_schemas";

export async function POST(request: NextRequest) {
  allowedActionMethod("POST", request);
  const data = (await getBodyData(request)) as CategoryTitleFormSchema;

  if (data.id) {
    const category = await prisma.category.update({
      where: { id: data.id },
      data: { title: data.title || null },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Тази категория не е намерена." },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Няма подаден 'id' на категория" },
    { status: 400 }
  );
}
