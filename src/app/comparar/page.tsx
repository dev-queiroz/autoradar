"use client";

import { useState, useCallback } from "react";

import { Container } from "@/components/layout/container";
import {
  VehiclePicker,
  CompareResult,
  type PickedVehicle,
} from "@/features/fipe";

export default function ComparePage() {
  const [left, setLeft] = useState<PickedVehicle>(null);
  const [right, setRight] = useState<PickedVehicle>(null);

  // useCallback evita loop infinito no useEffect do VehiclePicker
  const handleLeft = useCallback((v: PickedVehicle) => setLeft(v), []);
  const handleRight = useCallback((v: PickedVehicle) => setRight(v), []);

  return (
    <Container>
      <div className="py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Comparar veículos
          </h1>
          <p className="mt-2 text-muted-foreground">
            Selecione dois veículos pela tabela FIPE e veja a diferença de
            preço.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <VehiclePicker label="Veículo A" onChange={handleLeft} />
          <VehiclePicker label="Veículo B" onChange={handleRight} />
        </div>

        {left && right ? (
          <CompareResult left={left} right={right} />
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Selecione marca, modelo e ano dos dois veículos para comparar.
          </p>
        )}
      </div>
    </Container>
  );
}