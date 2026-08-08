import { describe, it, expect, vi } from 'vitest';
import { GET } from '../route';
import * as invertextoService from '@/lib/invertexto';

vi.mock('@/lib/invertexto');

describe('GET /api/fipe/brands', () => {
  it('deve retornar status 200 e a lista de marcas', async () => {
    const mockData = [{ id: '1', name: 'Fiat' }];
    vi.spyOn(invertextoService, 'getBrands').mockResolvedValueOnce(mockData);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(mockData);
  });
});
