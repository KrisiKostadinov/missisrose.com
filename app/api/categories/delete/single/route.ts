import { NextRequest, NextResponse } from "next/server";

import { allowedActionMethod } from "@/app/api/_helpers";

export async function DELETE(request: NextRequest) {
  try {
    allowedActionMethod("DELETE", request);
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    console.log(`Deleting item with ID: ${id}`);

    // Тук трябва да добавиш логиката за изтриване (примерно в база данни)
    // Пример:
    // await db.deleteItem(id);

    return NextResponse.json({ message: `Item with ID ${id} deleted` });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
