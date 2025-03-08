import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

export function allowedActionMethod(
  method: "GET" | "POST" | "PUT" | "DELETE",
  request: NextRequest,
  status: number = 405,
  errorMessage: string = "Методът не е позволен"
) {
  if (request.method !== method) {
    return NextResponse.json({ message: errorMessage }, { status });
  }
}

export async function getBodyData(
  request: NextRequest,
  errorMessage: string = "Невалидни данни",
  status: number = 400
) {
  const data = await request.json();

  if (!data) {
    return NextResponse.json({ message: errorMessage }, { status });
  }

  return data;
}

export function applyValidation(
  categoryNameFormSchema: ZodSchema,
  data: Record<string, string | string[] | boolean | number | null | undefined>
) {
  const validation = categoryNameFormSchema.safeParse(data);

  if (validation.error) {
    return NextResponse.json(
      { message: validation.error.message },
      { status: 400 }
    );
  }
}
