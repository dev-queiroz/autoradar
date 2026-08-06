import { searchInvertexto } from './invertexto';

export async function aggregateSearch(q = '', page = 1, perPage = 10) {
  // Use only Invertexto as the single provider
  const invertexto = await searchInvertexto(q, page, perPage);

  // If Invertexto not configured or returned no data, indicate unavailable
  if (!invertexto || !invertexto.items || invertexto.items.length === 0) return null;

  return invertexto;
}
