import { getYears } from "./years";

// Resolve price by brand/model/year using Invertexto years endpoint
export async function getPrice(brandId: string, modelId: string, yearId: string) {
  const yearsResp = await getYears(brandId, modelId);
  // yearsResp should include years array
  const yearEntry = (yearsResp.years || []).find((y: any) => String(y.year_id) === String(yearId) || String(y.model_year) === String(yearId));
  if (!yearEntry) throw new Error(`Year ${yearId} not found for model ${modelId}`);
  return yearEntry;
}
