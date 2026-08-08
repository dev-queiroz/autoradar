import axios from 'axios';
import { INVERTEXTO_BASE, INVERTEXTO_TOKEN } from './client';
import { getModels } from './models';
import { FipeModel, FipeYearsResponse } from './types';

export async function getYears(brandId: string, modelId: string): Promise<FipeYearsResponse> {
  if (!INVERTEXTO_TOKEN) throw new Error('INVERTEXTO_TOKEN is not configured');

  const modelsResp = await getModels(brandId);
  const model = (modelsResp || []).find(
    (m: FipeModel) => String(m.id) === String(modelId) || String(m.fipe_code) === String(modelId)
  );

  if (!model) throw new Error(`Model ${modelId} not found for brand ${brandId}`);

  const fipeCode = model.fipe_code || model.fipeCode;
  const url = `${INVERTEXTO_BASE}/fipe/years/${fipeCode}`;
  const { data } = await axios.get<FipeYearsResponse>(url, { params: { token: INVERTEXTO_TOKEN } });
  return data;
}
