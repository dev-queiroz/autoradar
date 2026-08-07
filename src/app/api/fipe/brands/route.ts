import { NextRequest, NextResponse } from "next/server";
import { getBrands } from "@/lib/invertexto/brands";

export async function GET(request: NextRequest) {
  try {
    const type = Number(request.nextUrl.searchParams.get("type") || "1");
    const data = await getBrands(type);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error fetching brands" },
      { status: 500 }
    );
  }
}