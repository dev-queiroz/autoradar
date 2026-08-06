import { NextResponse } from 'next/server';
import { getYears } from '@/services/fipe/years';

export async function GET(req: Request, { params }: { params: { brandId: string; modelId: string } }) {
  try {
    const { brandId, modelId } = params;
    const data = await getYears(brandId, modelId);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error?.message ?? 'Error fetching years' }, { status: 500 });
  }
}
