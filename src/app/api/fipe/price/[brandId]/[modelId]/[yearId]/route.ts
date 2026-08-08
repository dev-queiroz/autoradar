import { NextResponse } from 'next/server';
import { getPrice } from '@/lib/invertexto';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ brandId: string; modelId: string; yearId: string }> }
) {
  try {
    const { brandId, modelId, yearId } = await params;
    const data = await getPrice(brandId, modelId, yearId);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar preço';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
