import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { allowedActionMethod } from "@/app/api/_helpers";

export async function GET(request: NextRequest) {
  try {
    allowedActionMethod("GET", request);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "desc";

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { message: "Невалидни параметри за пагинация." },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    if (sort !== "asc" && sort !== "desc") {
      return NextResponse.json(
        { message: "Невалидни параметри за сортиране. Валидните са: (asc, desc)" },
        { status: 400 }
      );
    }

    const categories = await prisma.category.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: sort },
    });

    const total = await prisma.category.count();

    return NextResponse.json(
      {
        categories,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Възникна грешка при обработката на заявката." },
      { status: 500 }
    );
  }
}