import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import {
  allowedActionMethod,
  applyValidation,
  getBodyData,
} from "@/app/api/_helpers";
import {
  CategoryStatusFormSchema,
  categoryStatusFormSchema,
} from "@/app/api/categories/_schemas";

export async function POST(request: NextRequest) {
  allowedActionMethod("POST", request);
  const data = (await getBodyData(request)) as CategoryStatusFormSchema;
  applyValidation(categoryStatusFormSchema, data);

  if (data.status !== "DRAFT" && data.status !== "PUBLISHED") {
    return NextResponse.json(
      {
        message:
          "Невалиден статус на категорията. Можете да зададете само следните статуси: (Публикувано: PUBLISHED, Чернова: DRAFT)",
      },
      { status: 404 }
    );
  }

  if (data.id) {
    const category = await prisma.category.update({
      where: { id: data.id },
      data: { status: data.status },
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
