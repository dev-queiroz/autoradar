import { fipeApi } from "./client";

export async function getBrands() {
  const { data } = await fipeApi.get("/carros/marcas");
  return data;
}
