import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../route';
import * as invertextoService from '@/lib/invertexto';

vi.mock('@/lib/invertexto');

describe('GET /api/fipe/models/[brandId]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar status 200 e a lista de modelos para um brandId válido', async () => {
    const mockModels = [
      { id: '10', name: 'Gol' },
      { id: '20', name: 'Polo' },
    ];

    vi.spyOn(invertextoService, 'getModels').mockResolvedValueOnce(mockModels);

    const request = new Request('http://localhost:3000/api/fipe/models/59');
    const context = {
      params: Promise.resolve({ brandId: '59' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(mockModels);
    expect(invertextoService.getModels).toHaveBeenCalledWith('59');
  });

  it('deve retornar status 500 e mensagem de erro em caso de exceção', async () => {
    vi.spyOn(invertextoService, 'getModels').mockRejectedValueOnce(
      new Error('Erro interno do servidor FIPE')
    );

    const request = new Request('http://localhost:3000/api/fipe/models/59');
    const context = {
      params: Promise.resolve({ brandId: '59' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Erro interno do servidor FIPE' });
  });

  it('deve retornar mensagem de erro padrão quando o erro lançado não for do tipo Error', async () => {
    vi.spyOn(invertextoService, 'getModels').mockRejectedValueOnce('Erro em string pura');

    const request = new Request('http://localhost:3000/api/fipe/models/59');
    const context = {
      params: Promise.resolve({ brandId: '59' }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Erro ao buscar modelos' });
  });
});
