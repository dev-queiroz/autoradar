import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Container } from "../../../components/layout/container";

export function SearchSection() {
  return (
    <section className="pb-24">
      <Container>
        <div className="mx-auto flex max-w-2xl gap-3">
          <Input
            placeholder="Ex.: Nissan Kicks, Hyundai Creta..."
            className="h-12"
          />

          <Button asChild size="lg">
            <Link href="/pesquisar">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}