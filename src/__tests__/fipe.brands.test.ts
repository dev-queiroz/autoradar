import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { getBrands } from "@/services/fipe/brands";

vi.mock("axios");

const mockedAxios = vi.mocked(axios);

describe("FIPE brands service", () => {
  it("returns brands array when API responds", async () => {
    const mockData = [
      {
        nome: "Fiat",
        codigo: 1,
      },
    ];

    mockedAxios.get.mockResolvedValue({
      data: mockData,
    });

    const result = await getBrands();

    expect(result).toEqual(mockData);
  });
});