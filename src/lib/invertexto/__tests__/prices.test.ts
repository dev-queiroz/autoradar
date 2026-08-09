import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPrice } from '../prices';
import { getYears } from '../years';

vi.mock('../years', () => ({
  getYears: vi.fn(),
}));

const mockedGetYears = vi.mocked(getYears);

describe('getPrice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockYearsList = [
    { year_id: '2023-1', model_year: 2023, name: '2023 Gasolina' },
    { year_id: '2022-1', model_year: 2022, name: '2022 Gasolina' },
  ];

  it('deve retornar o ano correto quando encontrado pelo year_id', async () => {
    mockedGetYears.mockResolvedValueOnce({ years: mockYearsList });

    const result = await getPrice('59', '1234', '2023-1');

    expect(result).toEqual(mockYearsList[0]);
    expect(mockedGetYears).toHaveBeenCalledWith('59', '1234');
  });

  it('deve retornar o ano correto quando encontrado pelo model_year', async () => {
    mockedGetYears.mockResolvedValueOnce({ years: mockYearsList });

    const result = await getPrice('59', '1234', '2022');

    expect(result).toEqual(mockYearsList[1]);
  });

  it('deve lançar um erro quando o ano não for encontrado', async () => {
    mockedGetYears.mockResolvedValueOnce({ years: mockYearsList });

    await expect(getPrice('59', '1234', '2020')).rejects.toThrow(
      'Year 2020 not found for model 1234'
    );
  });

  it('deve tratar com segurança quando yearsResp.years for undefined', async () => {
    mockedGetYears.mockResolvedValueOnce({ years: undefined });

    await expect(getPrice('59', '1234', '2023')).rejects.toThrow(
      'Year 2023 not found for model 1234'
    );
  });
});
