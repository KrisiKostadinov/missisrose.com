import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { generateSlug } from "@/lib/utils";
import {
  allowedActionMethod,
  applyValidation,
  getBodyData,
} from "@/app/api/_helpers";
import {
  categoryNameFormSchema,
  CategoryNameFormSchema,
} from "@/app/api/categories/_schemas";

export async function POST(request: NextRequest) {
  allowedActionMethod("POST", request);
  const data = (await getBodyData(request)) as CategoryNameFormSchema;
  applyValidation(categoryNameFormSchema, data);

  const slug = data.create_slug ? generateSlug(data.name) : data.slug;

  if (!data.create_slug && (!slug || slug.trim().length === 0)) {
    return NextResponse.json(
      {
        message:
          "Моля, въведете slug, когато автоматичното генериране е изключено.",
      },
      { status: 400 }
    );
  }

  if (data.id) {
    const _category = await prisma.category.findUnique({
      where: {
        NOT: {
          id: data.id,
        },
        slug,
      },
    });

    if (_category) {
      return NextResponse.json(
        { message: "Тази категория съществува." },
        { status: 409 }
      );
    }

    const category = await prisma.category.update({
      where: { id: data.id },
      data: { name: data.name, slug },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Тази категория не е намерена." },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  }

  const _category = await prisma.category.findUnique({
    where: { slug },
  });

  if (_category) {
    return NextResponse.json(
      { message: "Тази категория съществува." },
      { status: 409 }
    );
  }

  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug: slug as string,
      places: ["ALL"],
      status: "DRAFT",
    },
  });

  return NextResponse.json({ category }, { status: 201 });
}
