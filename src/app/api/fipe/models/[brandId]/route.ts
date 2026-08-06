import { NextResponse } from 'next/server';
import { getModels } from '@/services/fipe/models';

export async function GET(req: Request, { params }: { params: { brandId: string } }) {
  try {
    const { brandId } = params;
    const data = await getModels(brandId);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error?.message ?? 'Error fetching models' }, { status: 500 });
  }
}
