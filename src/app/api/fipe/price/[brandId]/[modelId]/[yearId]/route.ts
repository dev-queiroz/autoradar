import { NextRequest, NextResponse } from 'next/server';
import { getPrice } from '@/services/fipe/prices';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      brandId: string;
      modelId: string;
      yearId: string;
    }>;
  }
) {
  try {
    const { brandId, modelId, yearId } = await params;

    const data = await getPrice(brandId, modelId, yearId);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'Error fetching price' },
      { status: 500 }
    );
  }
}