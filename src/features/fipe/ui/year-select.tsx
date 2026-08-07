"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Year } from "../model/types";

type Props = {
  years: Year[];
  value: string | null;
  onChange: (id: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function YearSelect({
  years,
  value,
  onChange,
  disabled,
  loading,
}: Props) {
  return (
    <Select
      value={value ?? undefined}
      onValueChange={onChange}
      disabled={disabled || loading}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            loading
              ? "Carregando anos..."
              : disabled
                ? "Selecione o modelo primeiro"
                : "Selecione o ano"
          }
        />
      </SelectTrigger>
      <SelectContent>
        {years.map((y) => (
          <SelectItem key={y.year_id} value={y.year_id}>
            {y.model_year} — {y.fuel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}