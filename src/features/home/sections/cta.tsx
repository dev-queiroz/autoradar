import Link from "next/link";

import { Button } from "../../../components/ui/button";
import { Container } from "../../../components/layout/container";

export function CtaSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="rounded-xl border bg-muted p-10 text-center">
          <h2 className="text-3xl font-bold">
            Pronto para encontrar seu próximo carro?
          </h2>

          <p className="mt-4 text-muted-foreground">
            Pesquise milhares de veículos, compare versões e descubra o preço
            justo antes de comprar.
          </p>

          <Button asChild size="lg" className="mt-8">
            <Link href="/pesquisar">Começar agora</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}