import axios from "axios";
import { INVERTEXTO_BASE, INVERTEXTO_TOKEN } from "./client";

export async function getModels(brandId: string) {
  if (!INVERTEXTO_TOKEN) throw new Error("INVERTEXTO_TOKEN is not configured");
  const url = `${INVERTEXTO_BASE}/fipe/models/${brandId}`;
  const { data } = await axios.get(url, { params: { token: INVERTEXTO_TOKEN } });
  return data;
}
