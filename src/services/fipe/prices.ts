import { fipeApi } from "./client";

export async function getPrice(brandId: string, modelId: string, yearId: string) {
  const { data } = await fipeApi.get(`/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`);
  return data;
}
