export interface FipeModel {
  id: string | number;
  fipe_code?: string;
  fipeCode?: string;
  name: string;
}

export interface FipeYear {
  year_id: string | number;
  model_year: string | number;
  name: string;
  price?: string;
}

export interface FipeYearsResponse {
  years?: FipeYear[];
}
