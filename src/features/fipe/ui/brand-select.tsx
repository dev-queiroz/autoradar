"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Brand } from "../model/types";

type Props = {
  brands: Brand[];
  value: string | null;
  onChange: (id: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function BrandSelect({
  brands,
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
          placeholder={loading ? "Carregando marcas..." : "Selecione a marca"}
        />
      </SelectTrigger>
      <SelectContent>
        {brands.map((b) => (
          <SelectItem key={String(b.id)} value={String(b.id)}>
            {b.brand}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}