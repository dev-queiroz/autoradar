import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeToggle } from '../theme-toggle';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('ThemeToggle', () => {
  it('deve renderizar o botão de alternância de tema', async () => {
    render(<ThemeToggle />);

    // Aguarda a microtask resolver o estado 'mounted'
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /alternar tema/i });
      expect(button).toBeDefined();
    });
  });
});
