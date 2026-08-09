import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getYears } from '../years';
import { getModels } from '../models';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

vi.mock('../models', () => ({
  getModels: vi.fn(),
}));
const mockedGetModels = vi.mocked(getModels);

vi.mock('../client', () => ({
  INVERTEXTO_BASE: 'https://api.invertexto.com/v1',
  INVERTEXTO_TOKEN: 'fake_token',
}));

describe('getYears', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockModelsList = [
    { id: '10', fipe_code: '005001-1', name: 'Gol' },
    { id: '20', fipeCode: '005002-2', name: 'Polo' },
  ];

  const mockYearsResponse = {
    years: [{ year_id: '2023-1', name: '2023 Gasolina' }],
  };

  it('deve buscar os anos com sucesso usando o id do modelo', async () => {
    mockedGetModels.mockResolvedValueOnce(mockModelsList);
    mockedAxios.get.mockResolvedValueOnce({ data: mockYearsResponse });

    const result = await getYears('59', '10');

    expect(result).toEqual(mockYearsResponse);
    expect(mockedGetModels).toHaveBeenCalledWith('59');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.invertexto.com/v1/fipe/years/005001-1',
      { params: { token: 'fake_token' } }
    );
  });

  it('deve buscar os anos utilizando fipeCode (camelCase) como fallback', async () => {
    mockedGetModels.mockResolvedValueOnce(mockModelsList);
    mockedAxios.get.mockResolvedValueOnce({ data: mockYearsResponse });

    await getYears('59', '20');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.invertexto.com/v1/fipe/years/005002-2',
      { params: { token: 'fake_token' } }
    );
  });

  it('deve lançar erro se o modelo não for encontrado', async () => {
    mockedGetModels.mockResolvedValueOnce(mockModelsList);

    await expect(getYears('59', '999')).rejects.toThrow('Model 999 not found for brand 59');
  });

  it('deve tratar com segurança quando getModels retornar null ou undefined', async () => {
    mockedGetModels.mockResolvedValueOnce(null as unknown as Awaited<ReturnType<typeof getModels>>);

    await expect(getYears('59', '10')).rejects.toThrow('Model 10 not found for brand 59');
  });

  it('deve lançar erro se INVERTEXTO_TOKEN não estiver configurado', async () => {
    vi.resetModules();
    vi.doUnmock('../models');

    vi.doMock('../client', () => ({
      INVERTEXTO_BASE: 'https://api.invertexto.com/v1',
      INVERTEXTO_TOKEN: undefined,
    }));

    const { getYears: getYearsWithoutToken } = await import('../years');

    await expect(getYearsWithoutToken('59', '10')).rejects.toThrow(
      'INVERTEXTO_TOKEN is not configured'
    );
  });
});
