import {
  BadgeDollarSign,
  CarFront,
  GitCompareArrows,
} from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import { Container } from "../../../components/layout/container";

const items = [
  {
    title: "Preço FIPE",
    description: "Consulte rapidamente o valor atualizado.",
    icon: BadgeDollarSign,
  },
  {
    title: "Compare versões",
    description: "Veja as diferenças entre modelos.",
    icon: GitCompareArrows,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <Icon className="mb-4 h-8 w-8 text-primary" />

                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}