import axios from 'axios';
import { INVERTEXTO_BASE, INVERTEXTO_TOKEN } from './client';
import { FipeModel } from './types';

export async function getModels(brandId: string): Promise<FipeModel[]> {
  if (!INVERTEXTO_TOKEN) throw new Error('INVERTEXTO_TOKEN is not configured');
  const url = `${INVERTEXTO_BASE}/fipe/models/${brandId}`;
  const { data } = await axios.get<FipeModel[]>(url, { params: { token: INVERTEXTO_TOKEN } });
  return data;
}
