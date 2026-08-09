import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../client')>();
  return {
    ...actual,
    INVERTEXTO_BASE: 'https://api.invertexto.com/v1',
    INVERTEXTO_TOKEN: 'fake_token',
  };
});

import { fipeApi, INVERTEXTO_BASE } from '../client';

describe('Invertexto Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create an axios instance with the correct baseURL and headers', () => {
    expect(fipeApi.defaults.baseURL).toBe(INVERTEXTO_BASE);
    expect(fipeApi.defaults.headers['Content-Type']).toBe('application/json');
  });
});
