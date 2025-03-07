import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { formSchema } from "@/app/dashboard/categories/_schema";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Методът не е позволен" },
      { status: 405 }
    );
  }

  const data = await req.json();

  if (!data) {
    return NextResponse.json({ message: "Невалидни данни" }, { status: 400 });
  }

  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.message },
      { status: 400 }
    );
  }

  let category = {
    name: data.name,
    slug: data.slug,
    title: data.title,
    description: data.description,
    status: data.status,
    places: data.places,
  };

  if (!data.id) {
    category = await prisma.category.create({
      data: category,
    });
  } else {
    category = await prisma.category.update({
      where: { id: data.id },
      data: category,
    });
  }

  return NextResponse.json({ category }, { status: 201 });
}