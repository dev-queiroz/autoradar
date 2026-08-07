"use client";

import { Button } from "@/components/ui/button";
import type { VehicleType } from "../model/types";

const TYPES: { value: VehicleType; label: string }[] = [
  { value: 1, label: "Carro" },
  { value: 2, label: "Moto" },
  { value: 3, label: "Caminhão" },
];

type Props = {
  value: VehicleType;
  onChange: (type: VehicleType) => void;
};

export function TypeSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((t) => (
        <Button
          key={t.value}
          type="button"
          variant={value === t.value ? "default" : "outline"}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}