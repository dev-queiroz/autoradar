import axios from "axios";

export const INVERTEXTO_BASE = process.env.INVERTEXTO_BASE || "https://api.invertexto.com/v1";
export const INVERTEXTO_TOKEN = process.env.INVERTEXTO_TOKEN;

export const fipeApi = axios.create({
  baseURL: INVERTEXTO_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
