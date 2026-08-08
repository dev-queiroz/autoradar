import { NextResponse } from 'next/server';
import { getYears } from '@/lib/invertexto';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ brandId: string; modelId: string }> }
) {
  try {
    const { brandId, modelId } = await params;
    const data = await getYears(brandId, modelId);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar anos';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
