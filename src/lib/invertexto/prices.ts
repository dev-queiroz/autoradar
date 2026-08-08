import { getYears } from './years';
import { FipeYear } from './types';

export async function getPrice(
  brandId: string,
  modelId: string,
  yearId: string
): Promise<FipeYear> {
  const yearsResp = await getYears(brandId, modelId);
  const yearEntry = (yearsResp.years || []).find(
    (y: FipeYear) => String(y.year_id) === String(yearId) || String(y.model_year) === String(yearId)
  );

  if (!yearEntry) throw new Error(`Year ${yearId} not found for model ${modelId}`);
  return yearEntry;
}
