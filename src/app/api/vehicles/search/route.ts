import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || '';
  const page = Number(url.searchParams.get('page') || '1');
  const perPage = Number(url.searchParams.get('perPage') || '10');

  // Delegate to aggregator which calls real providers if configured
  const { aggregateSearch } = await import('@/services/aggregator');
  const result = await aggregateSearch(q, page, perPage);

  if (!result) {
    return NextResponse.json({
      message: 'No provider configured. Set GECKO_BASE+GECKO_API_KEY or INVERTEXTO_TOKEN in environment variables to enable real search.'
    }, { status: 503 });
  }

  return NextResponse.json(result);
}
