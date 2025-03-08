import { NextRequest, NextResponse } from "next/server";

import { allowedActionMethod } from "@/app/api/_helpers";
import { prisma } from "@/db/prisma";

export async function GET(request: NextRequest) {
  allowedActionMethod("GET", request);
  const searchParams = request.nextUrl.searchParams;

  const key = searchParams.get("key");
  const value = searchParams.get("value");

  if (!key || !value) {
    return NextResponse.json(
      { error: "Липсва 'key' или 'value' параметър." },
      { status: 400 }
    );
  }

  if (key !== "id" && key !== "slug") {
    return NextResponse.json(
      {
        error:
          "Невалидна колона. Можете да вземете категория по следните колони: (id, slug).",
      },
      { status: 400 }
    );
  }

  try {
    const category = await prisma.category.findFirst({
      where: { [key]: value },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Категорията не е намерена." },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Възникна грешка при заявката към базата данни." },
      { status: 500 }
    );
  }
}