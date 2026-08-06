import axios from 'axios';

const INVERTEXTO_BASE = process.env.INVERTEXTO_BASE || 'https://api.invertexto.com/v1';
const INVERTEXTO_TOKEN = process.env.INVERTEXTO_TOKEN;

export async function searchInvertexto(q: string, page = 1, perPage = 10) {
  if (!INVERTEXTO_TOKEN) return null; // not configured

  // Invertexto primarily exposes FIPE endpoints. If the provider doesn't support a generic
  // search endpoint for listings, we rely on a dedicated search endpoint at /search.
  try {
    const res = await axios.get(`${INVERTEXTO_BASE}/search`, {
      params: { q, page, perPage, token: INVERTEXTO_TOKEN },
    });
    return res.data;
  } catch (e) {
    return null;
  }
}
