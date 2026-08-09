import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeToggle } from '../theme-toggle';

const mockSetTheme = vi.fn();
let mockResolvedTheme = 'light';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockResolvedTheme = 'light';
  });

  it('deve renderizar o botão e alterar o tema ao clicar (modo claro para escuro)', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /alternar tema/i });
      expect(button).toBeDefined();

      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
  });

  it('deve alternar do modo escuro para o claro ao clicar', async () => {
    mockResolvedTheme = 'dark';
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /alternar tema/i });
      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });
});
