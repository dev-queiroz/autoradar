import { NextResponse } from 'next/server';
import { getBrands } from '@/lib/invertexto';

export async function GET() {
  try {
    const data = await getBrands();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar marcas';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
