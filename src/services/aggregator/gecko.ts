import axios from 'axios';

const GECKO_BASE = process.env.GECKO_BASE || process.env.NEXT_PUBLIC_GECKO_BASE;
const GECKO_KEY = process.env.GECKO_API_KEY || process.env.NEXT_PUBLIC_GECKO_KEY;

export async function searchGecko(q: string, page = 1, perPage = 10) {
  if (!GECKO_BASE || !GECKO_KEY) return null;

  try {
    const res = await axios.get(`${GECKO_BASE}/search`, {
      params: { q, page, perPage },
      headers: { Authorization: `Bearer ${GECKO_KEY}` },
    });
    return res.data;
  } catch (e) {
    return null;
  }
}
