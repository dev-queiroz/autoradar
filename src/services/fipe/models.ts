import { fipeApi } from "./client";

export async function getModels(brandId: string) {
  const { data } = await fipeApi.get(`/carros/marcas/${brandId}/modelos`);
  return data;
}
