import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getModels } from '../models';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

vi.mock('../client', async () => ({
  INVERTEXTO_BASE: 'https://api.invertexto.com/v1',
  INVERTEXTO_TOKEN: 'fake_token',
}));

describe('getModels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar a lista de modelos quando a requisição for bem-sucedida', async () => {
    const mockModels = [
      { id: '1', name: 'Gol' },
      { id: '2', name: 'Polo' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockModels });

    const brandId = '59';
    const result = await getModels(brandId);

    expect(result).toEqual(mockModels);

    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.invertexto.com/v1/fipe/models/59', {
      params: { token: 'fake_token' },
    });
  });
});
