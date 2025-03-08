import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import {
  allowedActionMethod,
  applyValidation,
  getBodyData,
} from "@/app/api/_helpers";
import {
  categoryPlaceFormSchema,
  CategoryPlaceFormSchema,
  allowedPlaces,
} from "@/app/api/categories/_schemas";

export async function POST(request: NextRequest) {
  allowedActionMethod("POST", request);
  const data = (await getBodyData(request)) as CategoryPlaceFormSchema;
  applyValidation(categoryPlaceFormSchema, data);

  const invalidPlaces = data.places.filter(
    (place) => !Object.keys(allowedPlaces).includes(place)
  );

  if (invalidPlaces.length > 0) {
    return NextResponse.json(
      {
        message: `Невалидни места. Можете да зададете само следните стойности: ${Object.keys(
          allowedPlaces
        ).join(", ")}.`,
      },
      { status: 404 }
    );
  }

  if (data.id) {
    const category = await prisma.category.update({
      where: { id: data.id },
      data: { places: data.places },
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
