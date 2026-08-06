import { NextRequest, NextResponse } from 'next/server';
import { getModels } from '@/services/fipe/models';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brandId: string }> }
) {
  try {
    const { brandId } = await params;

    const data = await getModels(brandId);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'Error fetching models' },
      { status: 500 }
    );
  }
}