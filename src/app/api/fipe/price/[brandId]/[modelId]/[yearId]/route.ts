import { NextResponse } from 'next/server';
import { getPrice } from '@/services/fipe/prices';

export async function GET(req: Request, { params }: { params: { brandId: string; modelId: string; yearId: string } }) {
  try {
    const { brandId, modelId, yearId } = params;
    const data = await getPrice(brandId, modelId, yearId);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error?.message ?? 'Error fetching price' }, { status: 500 });
  }
}
