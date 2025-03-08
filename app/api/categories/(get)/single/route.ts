import { NextRequest, NextResponse } from "next/server";

import { allowedActionMethod } from "@/app/api/_helpers";
import { prisma } from "@/db/prisma";

export async function POST(request: NextRequest) {
  allowedActionMethod("GET", request);
  const searchParams = request.nextUrl.searchParams;

  const key = searchParams.get("key");
  const value = searchParams.get("value");

  if (key !== "id" && key !== "slug") {
    return NextResponse.json(
      {
        error:
          "Невалидна колона. Можете да вземете категория по следните колони: (id, slug).",
      },
      { status: 400 }
    );
  }

  const category = await prisma.category.findFirst({
    where: { [key as string]: value },
  });

  return NextResponse.json(category, { status: 200 });
}
