import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('../client', () => ({
  INVERTEXTO_BASE: 'https://api.invertexto.com/v1',
  INVERTEXTO_TOKEN: 'fake_token',
}));

import { getBrands } from '../brands';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('Invertexto Brands Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar a lista de marcas quando a chamada for bem-sucedida', async () => {
    const mockBrands = [
      { id: '1', name: 'Acura' },
      { id: '2', name: 'Agrale' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockBrands });

    const result = await getBrands(1);

    expect(result).toEqual(mockBrands);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('deve lançar um erro se INVERTEXTO_TOKEN não estiver configurado', async () => {
    vi.resetModules();

    vi.doMock('../client', () => ({
      INVERTEXTO_BASE: 'https://api.invertexto.com/v1',
      INVERTEXTO_TOKEN: undefined,
    }));

    const { getBrands: getBrandsWithoutToken } = await import('../brands');

    await expect(getBrandsWithoutToken(1)).rejects.toThrow('INVERTEXTO_TOKEN is not configured');
  });
});
