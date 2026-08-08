import { NextResponse } from 'next/server';
import { getModels } from '@/lib/invertexto';

export async function GET(_request: Request, { params }: { params: Promise<{ brandId: string }> }) {
  try {
    const { brandId } = await params;
    const data = await getModels(brandId);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar modelos';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
