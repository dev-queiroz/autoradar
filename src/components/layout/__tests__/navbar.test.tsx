import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../navbar';

vi.mock('../../config/site', () => ({
  siteConfig: {
    name: 'AutoRadar',
  },
}));

vi.mock('../../constants/navigation', () => ({
  navigation: [
    { label: 'Pesquisar', href: '/pesquisar' },
    { label: 'Comparar', href: '/comparar' },
  ],
}));

vi.mock('../theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Alternar Tema</button>,
}));

describe('Navbar', () => {
  it('deve renderizar o logo/marca apontando para a página inicial', () => {
    render(<Navbar />);

    const brandLink = screen.getByRole('link', { name: /autoradar/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('deve renderizar os links da navegação principal através do loop .map()', () => {
    render(<Navbar />);

    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(nav).toBeInTheDocument();

    const pesquisarLink = screen.getByRole('link', { name: 'Pesquisar' });
    const compararLink = screen.getByRole('link', { name: 'Comparar' });

    expect(pesquisarLink).toBeInTheDocument();
    expect(pesquisarLink).toHaveAttribute('href', '/pesquisar');

    expect(compararLink).toBeInTheDocument();
    expect(compararLink).toHaveAttribute('href', '/comparar');
  });

  it('deve renderizar o componente ThemeToggle', () => {
    render(<Navbar />);

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});
