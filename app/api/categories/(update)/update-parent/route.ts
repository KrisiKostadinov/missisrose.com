import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { allowedActionMethod, getBodyData } from "@/app/api/_helpers";
import { CategoryParentFormSchema } from "@/app/api/categories/_schemas";

export async function POST(request: NextRequest) {
  try {
    allowedActionMethod("POST", request);
    const data = (await getBodyData(request)) as CategoryParentFormSchema;

    if (!data.id || !data.parent_id) {
      return NextResponse.json(
        { message: "Липсва идентификатор на категория или родител." },
        { status: 400 }
      );
    }

    if (data.id === data.parent_id) {
      return NextResponse.json(
        { message: "Категорията не може да бъде родител сама на себе си." },
        { status: 400 }
      );
    }

    const child = await prisma.category.findUnique({
      where: { id: data.id },
    });

    if (!child) {
      return NextResponse.json(
        { message: "Тази дъщерна категория не е намерена." },
        { status: 404 }
      );
    }

    const parent = await prisma.category.findUnique({
      where: { id: data.parent_id },
    });

    if (!parent) {
      return NextResponse.json(
        { message: "Тази родителска категория не е намерена." },
        { status: 404 }
      );
    }

    if (child.parentId === data.parent_id) {
      return NextResponse.json(
        { message: "Категорията вече има този родител." },
        { status: 400 }
      );
    }

    let currentParentId: number | null = data.parent_id;
    while (currentParentId) {
      if (currentParentId === data.id) {
        return NextResponse.json(
          { message: "Не може да създадете циклична зависимост в категориите." },
          { status: 400 }
        );
      }
      const currentParent: { id: number; parentId: number | null } | null = await prisma.category.findUnique({
        where: { id: currentParentId },
      });
      currentParentId = currentParent?.parentId || null;
    }

    const category = await prisma.category.update({
      where: { id: data.id },
      data: { parentId: data.parent_id },
    });

    return NextResponse.json({ category }, { status: 200 });

  } catch (error) {
    console.error("Грешка при добавяне на дъщерна категория:", error);
    return NextResponse.json(
      { message: "Възникна грешка при обработката на заявката." },
      { status: 500 }
    );
  }
}