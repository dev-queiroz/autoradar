import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Container } from "../../../components/layout/container";

export function Hero() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground">
            🚗 AutoRadar
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Encontre o veículo ideal para você.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Compare versões, consulte a FIPE, mas fique informado sobre o preço justo antes de comprar.
          </p>

          <Button asChild size="lg" className="mt-10">
            <Link href="/pesquisar">
              <Search className="mr-2 h-5 w-5" />
              Pesquisar veículos
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}