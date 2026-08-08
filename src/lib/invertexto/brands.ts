import axios from 'axios';
import { INVERTEXTO_BASE, INVERTEXTO_TOKEN } from './client';

export async function getBrands(type = 1) {
  if (!INVERTEXTO_TOKEN) throw new Error('INVERTEXTO_TOKEN is not configured');
  const url = `${INVERTEXTO_BASE}/fipe/brands/${type}`;
  const { data } = await axios.get(url, { params: { token: INVERTEXTO_TOKEN } });
  return data;
}
