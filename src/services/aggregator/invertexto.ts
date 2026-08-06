import axios from 'axios';

const INVERTEXTO_BASE = process.env.INVERtexto_BASE || 'https://api.invertexto.com/v1';
const INVERTEXTO_TOKEN = process.env.INVERtexto_TOKEN;

export async function searchInvertexto(q: string, page = 1, perPage = 10) {
  if (!INVERTEXTO_TOKEN) return null; // not configured

  // Invertexto primarily exposes FIPE endpoints; if it has ads endpoints, adjust here.
  // This implementation attempts to call a hypothetical search endpoint. If unavailable, return null.
  try {
    const res = await axios.get(`${INVERTEXTO_BASE}/search`, {
      params: { q, page, perPage, token: INVERTEXTO_TOKEN },
    });
    return res.data;
  } catch (e) {
    return null;
  }
}
