"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Loading } from "@/components/common/loading";
import { TypeSelector } from "./type-selector";
import { BrandSelect } from "./brand-select";
import { ModelSelect } from "./model-select";
import { YearSelect } from "./year-select";
import type {
  VehicleType,
  Brand,
  Model,
  Year,
  YearsResponse,
} from "../model/types";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Erro ao buscar dados");
  }
  return res.json();
}

export type PickedVehicle = {
  type: VehicleType;
  brandId: string;
  modelId: string;
  yearId: string;
  brandName: string;
  modelName: string;
  year: Year;
  reference?: string;
} | null;

type Props = {
  label: string;
  onChange: (vehicle: PickedVehicle) => void;
};

export function VehiclePicker({ label, onChange }: Props) {
  const [type, setType] = useState<VehicleType>(1);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const [yearId, setYearId] = useState<string | null>(null);

  const brandsQuery = useQuery({
    queryKey: ["fipe", "brands", type],
    queryFn: () => fetchJson<Brand[]>(`/api/fipe/brands?type=${type}`),
  });

  const modelsQuery = useQuery({
    queryKey: ["fipe", "models", brandId],
    queryFn: () => fetchJson<Model[]>(`/api/fipe/models/${brandId}`),
    enabled: !!brandId,
  });

  const yearsQuery = useQuery({
    queryKey: ["fipe", "years", brandId, modelId],
    queryFn: () =>
      fetchJson<YearsResponse>(`/api/fipe/years/${brandId}/${modelId}`),
    enabled: !!brandId && !!modelId,
  });

  const selectedYear =
    yearsQuery.data?.years?.find((y) => y.year_id === yearId) ?? null;

  const brandName =
    brandsQuery.data?.find((b) => String(b.id) === brandId)?.brand ?? "";
  const modelName =
    modelsQuery.data?.find((m) => String(m.id) === modelId)?.model ?? "";

  // Notifica o pai quando a seleção estiver completa
  useEffect(() => {
    if (brandId && modelId && yearId && selectedYear) {
      onChange({
        type,
        brandId,
        modelId,
        yearId,
        brandName,
        modelName,
        year: selectedYear,
        reference: yearsQuery.data?.reference,
      });
    } else {
      onChange(null);
    }
  }, [
    brandId,
    modelId,
    yearId,
    selectedYear,
    brandName,
    modelName,
    type,
    yearsQuery.data?.reference,
    onChange,
  ]);

  function handleTypeChange(next: VehicleType) {
    setType(next);
    setBrandId(null);
    setModelId(null);
    setYearId(null);
  }

  function handleBrandChange(id: string) {
    setBrandId(id);
    setModelId(null);
    setYearId(null);
  }

  function handleModelChange(id: string) {
    setModelId(id);
    setYearId(null);
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h2 className="font-semibold">{label}</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tipo</label>
        <TypeSelector value={type} onChange={handleTypeChange} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Marca</label>
        {brandsQuery.isLoading ? (
          <Loading size={20} />
        ) : brandsQuery.isError ? (
          <p className="text-sm text-destructive">
            {(brandsQuery.error as Error).message.includes("429")
              ? "Limite de consultas. Aguarde e tente de novo."
              : (brandsQuery.error as Error).message}
          </p>
        ) : (
          <BrandSelect
            brands={brandsQuery.data ?? []}
            value={brandId}
            onChange={handleBrandChange}
            loading={brandsQuery.isLoading}
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Modelo</label>
        <ModelSelect
          models={modelsQuery.data ?? []}
          value={modelId}
          onChange={handleModelChange}
          disabled={!brandId}
          loading={modelsQuery.isFetching}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Ano</label>
        <YearSelect
          years={yearsQuery.data?.years ?? []}
          value={yearId}
          onChange={setYearId}
          disabled={!modelId}
          loading={yearsQuery.isFetching}
        />
      </div>
    </div>
  );
}