import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || '';
  const page = Number(url.searchParams.get('page') || '1');
  const perPage = Number(url.searchParams.get('perPage') || '10');

  // Simple mock dataset generator
  const total = 42;
  const totalPages = Math.ceil(total / perPage);

  const items = Array.from({ length: perPage }, (_, i) => {
    const idx = (page - 1) * perPage + i + 1;
    if (idx > total) return null;
    return {
      id: String(idx),
      title: `${q || 'Veículo'} Modelo ${idx}`,
      price: `R$ ${ (30000 + idx * 500).toLocaleString('pt-BR') }`,
      year: `${2010 + (idx % 13)}`,
      km: `${(50000 + idx * 1234).toLocaleString('pt-BR')} km`,
      image: null,
      location: 'São Paulo, SP',
      href: `/veiculos/${idx}`,
    };
  }).filter(Boolean);

  return NextResponse.json({ page, perPage, total, totalPages, items });
}
