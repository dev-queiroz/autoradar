import axios from "axios";

export const fipeApi = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
