import { fipeApi } from "./client";

export async function getYears(brandId: string, modelId: string) {
  const { data } = await fipeApi.get(`/carros/marcas/${brandId}/modelos/${modelId}/anos`);
  return data;
}
