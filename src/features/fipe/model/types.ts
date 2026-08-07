export type VehicleType = 1 | 2 | 3; // 1=carro, 2=moto, 3=caminhão

export type Brand = {
  id: number | string;
  brand: string;
};

export type Model = {
  id: number | string;
  fipe_code?: string;
  fipeCode?: string;
  model: string;
  years?: string;
};

export type Year = {
  year_id: string;
  model_year: string;
  fuel: string;
  price: number;
};

export type YearsResponse = {
  brand: string;
  model: string;
  reference: string;
  years: Year[];
};

export type PriceResult = Year & {
  brand?: string;
  model?: string;
  reference?: string;
};