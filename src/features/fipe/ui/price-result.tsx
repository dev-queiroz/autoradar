"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PriceResult } from "../model/types";

type Props = {
  data: PriceResult | null;
  brandName?: string;
  modelName?: string;
  reference?: string;
  loading?: boolean;
};

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function PriceResult({
  data,
  brandName,
  modelName,
  reference,
  loading,
}: Props) {
  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Consultando preço FIPE...
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {brandName} {modelName}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {data.model_year} · {data.fuel}
          {reference ? ` · Ref: ${reference}` : null}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Valor FIPE</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">
          {formatPrice(data.price)}
        </p>
      </CardContent>
    </Card>
  );
}