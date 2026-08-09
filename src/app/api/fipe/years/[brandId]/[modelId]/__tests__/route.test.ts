import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../route';
import * as invertextoService from '@/lib/invertexto';

vi.mock('@/lib/invertexto');

describe('GET /api/fipe/years/[brandId]/[modelId]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar status 200 e a lista de anos quando a busca for bem-sucedida', async () => {
    const mockYears = {
      years: [{ year_id: '2023-1', name: '2023 Gasolina' }],
    };

    vi.spyOn(invertextoService, 'getYears').mockResolvedValueOnce(
      mockYears as Awaited<ReturnType<typeof invertextoService.getYears>>
    );

    const request = new Request('http://localhost:3000/api/fipe/years/59/10');
    const context = {
      params: Promise.resolve({ brandId: '59', modelId: '10' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(mockYears);
    expect(invertextoService.getYears).toHaveBeenCalledWith('59', '10');
  });

  it('deve retornar status 500 e mensagem de erro em caso de falha', async () => {
    vi.spyOn(invertextoService, 'getYears').mockRejectedValueOnce(
      new Error('Erro ao buscar anos da FIPE')
    );

    const request = new Request('http://localhost:3000/api/fipe/years/59/10');
    const context = {
      params: Promise.resolve({ brandId: '59', modelId: '10' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Erro ao buscar anos da FIPE' });
  });

  it('deve retornar mensagem de erro padrão quando o erro lançado não for do tipo Error', async () => {
    vi.spyOn(invertextoService, 'getYears').mockRejectedValueOnce('Erro em string pura');

    const request = new Request('http://localhost:3000/api/fipe/years/59/10');
    const context = {
      params: Promise.resolve({ brandId: '59', modelId: '10' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Erro ao buscar anos' });
  });
});
