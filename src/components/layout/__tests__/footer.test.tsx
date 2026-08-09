import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '../footer';

// Mock alinhado com os dados reais do siteConfig
vi.mock('../../config/site', () => ({
  siteConfig: {
    name: 'AutoRadar',
    github: 'https://github.com/dev-queiroz/autoradar',
    license: 'https://github.com/dev-queiroz/autoradar/blob/main/LICENSE',
  },
}));

describe('Footer', () => {
  it('deve renderizar o texto de copyright com o ano atual dinamicamente', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    // RegExp flexível que ignora quebras de linha e múltiplos espaços entre ©, Ano e Nome
    const copyrightRegex = new RegExp(`©\\s*${currentYear}\\s*AutoRadar`, 'i');

    expect(screen.getByText(copyrightRegex)).toBeInTheDocument();
  });

  it('deve renderizar os links de GitHub e Licença com atributos corretos', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const licenseLink = screen.getByRole('link', { name: 'MIT License' });

    // Verifica os links conforme configurados no siteConfig
    expect(githubLink).toHaveAttribute('href', 'https://github.com/dev-queiroz/autoradar');
    expect(licenseLink).toHaveAttribute(
      'href',
      'https://github.com/dev-queiroz/autoradar/blob/main/LICENSE'
    );

    // Verifica atributos de segurança para target="_blank"
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(licenseLink).toHaveAttribute('target', '_blank');
    expect(licenseLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
