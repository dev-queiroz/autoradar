import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getBrands } from '@/services/fipe/brands';

vi.mock('axios');

describe('FIPE brands service', () => {
  it('returns brands array when API responds', async () => {
    const mockData = [{ nome: 'Fiat', codigo: 1 }];
    (axios.get as unknown as vi.Mock).mockResolvedValue({ data: mockData });

    const result = await getBrands();
    expect(result).toEqual(mockData);
  });
});
