import axios from "axios";
import { INVERTEXTO_BASE, INVERTEXTO_TOKEN } from "./client";
import { getModels } from "./models";

// Invertexto provides years by fipe_code. This helper resolves modelId -> fipe_code then fetches years.
export async function getYears(brandId: string, modelId: string) {
  if (!INVERTEXTO_TOKEN) throw new Error("INVERTEXTO_TOKEN is not configured");

  const modelsResp = await getModels(brandId);
  // modelsResp is expected to be an array of models with fields including 'id' and 'fipe_code'
  const model = (modelsResp || []).find((m: any) => String(m.id) === String(modelId) || String(m.fipe_code) === String(modelId));
  if (!model) throw new Error(`Model ${modelId} not found for brand ${brandId}`);

  const fipeCode = model.fipe_code || model.fipeCode || model.fipe_code;
  const url = `${INVERTEXTO_BASE}/fipe/years/${fipeCode}`;
  const { data } = await axios.get(url, { params: { token: INVERTEXTO_TOKEN } });
  return data;
}
