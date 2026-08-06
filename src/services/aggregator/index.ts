import { searchGecko } from './gecko';
import { searchInvertexto } from './invertexto';
import { searchVehicles as searchMock } from '@/services/vehicles';

export async function aggregateSearch(q = '', page = 1, perPage = 10) {
  // Try real providers in parallel
  const [gecko, invertexto] = await Promise.all([searchGecko(q, page, perPage), searchInvertexto(q, page, perPage)]);

  // Prefer gecko > invertexto > mock
  if (gecko && gecko.items && gecko.items.length > 0) return gecko;
  if (invertexto && invertexto.items && invertexto.items.length > 0) return invertexto;

  // As a fallback, if no provider configured, return an error to indicate configuration needed
  if (!gecko && !invertexto) {
    // If absolutely no providers configured, return null to indicate upstream should explain configuration
    return null;
  }

  // If providers configured but returned empty, return mock (graceful fallback)
  return searchMock(q, page, perPage);
}
