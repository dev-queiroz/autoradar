import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from '../container';

describe('Container', () => {
  it('deve renderizar os elementos filhos corretamente', () => {
    render(
      <Container>
        <span>Conteúdo do Container</span>
      </Container>
    );

    expect(screen.getByText('Conteúdo do Container')).toBeInTheDocument();
  });

  it('deve aplicar as classes padrão e permitir classes customizadas', () => {
    const { container } = render(
      <Container className="custom-class">
        <span>Teste</span>
      </Container>
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('mx-auto', 'w-full', 'max-w-7xl', 'custom-class');
  });
});
