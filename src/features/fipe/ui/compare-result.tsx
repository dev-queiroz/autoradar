"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PickedVehicle } from "./vehicle-picker";

type Props = {
  left: PickedVehicle;
  right: PickedVehicle;
};

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function VehicleSummary({
  vehicle,
  side,
}: {
  vehicle: NonNullable<PickedVehicle>;
  side: string;
}) {
  return (
    <Card>
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {side}
        </p>
        <CardTitle className="text-base leading-snug">
          {vehicle.brandName} {vehicle.modelName}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {vehicle.year.model_year} · {vehicle.year.fuel}
          {vehicle.reference ? ` · ${vehicle.reference}` : null}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Valor FIPE</p>
        <p className="mt-1 text-2xl font-bold">
          {formatPrice(vehicle.year.price)}
        </p>
      </CardContent>
    </Card>
  );
}

export function CompareResult({ left, right }: Props) {
  if (!left || !right) return null;

  const diff = left.year.price - right.year.price;
  const absDiff = Math.abs(diff);
  const pct =
    right.year.price > 0
      ? ((absDiff / right.year.price) * 100).toFixed(1)
      : "0";

  const cheaper =
    diff < 0 ? "Esquerda" : diff > 0 ? "Direita" : "Mesmo valor";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <VehicleSummary vehicle={left} side="Veículo A" />
        <VehicleSummary vehicle={right} side="Veículo B" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Diferença</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {diff === 0 ? (
            <p className="text-lg font-semibold">Os valores FIPE são iguais</p>
          ) : (
            <>
              <p className="text-2xl font-bold">{formatPrice(absDiff)}</p>
              <p className="text-sm text-muted-foreground">
                {cheaper === "Esquerda"
                  ? "Veículo A é mais barato"
                  : "Veículo B é mais barato"}{" "}
                ({pct}% de diferença)
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}