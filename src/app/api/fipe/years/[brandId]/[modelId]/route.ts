import { NextRequest, NextResponse } from "next/server";
import { getYears } from "@/lib/invertexto/years";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ brandId: string; modelId: string }> }
) {
  try {
    const { brandId, modelId } = await params;
    const data = await getYears(brandId, modelId);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error fetching years" },
      { status: 500 }
    );
  }
}