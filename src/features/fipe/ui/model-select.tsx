"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Model } from "../model/types";

type Props = {
  models: Model[];
  value: string | null;
  onChange: (id: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function ModelSelect({
  models,
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
              ? "Carregando modelos..."
              : disabled
                ? "Selecione a marca primeiro"
                : "Selecione o modelo"
          }
        />
      </SelectTrigger>
      <SelectContent>
        {models.map((m) => (
          <SelectItem key={String(m.id)} value={String(m.id)}>
            {m.model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}