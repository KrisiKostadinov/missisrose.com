import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { allowedActionMethod } from "@/app/api/_helpers";

export async function DELETE(request: NextRequest) {
  try {
    allowedActionMethod("DELETE", request);
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const category = await prisma.category.deleteMany({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Тази категория не е намерена." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: `Item with ID ${id} deleted` });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
