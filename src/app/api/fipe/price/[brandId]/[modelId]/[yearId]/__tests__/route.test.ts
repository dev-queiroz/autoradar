import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../route';
import * as invertextoService from '@/lib/invertexto';

vi.mock('@/lib/invertexto');

describe('GET /api/fipe/price/[brandId]/[modelId]/[yearId]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar status 200 e o detalhe do preço quando encontrado', async () => {
    const mockPrice = {
      year_id: '2023-1',
      name: '2023 Gasolina',
      price: 'R$ 80.000',
    };

    vi.spyOn(invertextoService, 'getPrice').mockResolvedValueOnce(
      mockPrice as Awaited<ReturnType<typeof invertextoService.getPrice>>
    );

    const request = new Request('http://localhost:3000/api/fipe/price/59/10/2023-1');
    const context = {
      params: Promise.resolve({ brandId: '59', modelId: '10', yearId: '2023-1' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(mockPrice);
    expect(invertextoService.getPrice).toHaveBeenCalledWith('59', '10', '2023-1');
  });

  it('deve retornar status 500 em caso de erro na busca de preço', async () => {
    vi.spyOn(invertextoService, 'getPrice').mockRejectedValueOnce(new Error('Ano não encontrado'));

    const request = new Request('http://localhost:3000/api/fipe/price/59/10/2023-1');
    const context = {
      params: Promise.resolve({ brandId: '59', modelId: '10', yearId: '2023-1' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Ano não encontrado' });
  });

  it('deve retornar mensagem de erro padrão quando o erro lançado não for do tipo Error', async () => {
    vi.spyOn(invertextoService, 'getPrice').mockRejectedValueOnce('Erro em string pura');

    const request = new Request('http://localhost:3000/api/fipe/price/59/10/2023-1');
    const context = {
      params: Promise.resolve({ brandId: '59', modelId: '10', yearId: '2023-1' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Erro ao buscar preço' });
  });
});
