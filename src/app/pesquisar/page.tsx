"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/layout/container";
import { Loading } from "@/components/common/loading";
import {
  TypeSelector,
  BrandSelect,
  ModelSelect,
  YearSelect,
  PriceResult,
  type VehicleType,
  type Brand,
  type Model,
  type YearsResponse,
  type Year,
} from "@/features/fipe";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Erro ao buscar dados");
  }
  return res.json();
}

export default function SearchPage() {
  const [type, setType] = useState<VehicleType>(1);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const [yearId, setYearId] = useState<string | null>(null);

  // Marcas
  const brandsQuery = useQuery({
    queryKey: ["fipe", "brands", type],
    queryFn: () => fetchJson<Brand[]>(`/api/fipe/brands?type=${type}`),
  });

  // Modelos (só quando tem marca)
  const modelsQuery = useQuery({
    queryKey: ["fipe", "models", brandId],
    queryFn: () => fetchJson<Model[]>(`/api/fipe/models/${brandId}`),
    enabled: !!brandId,
  });

  // Anos (só quando tem modelo)
  const yearsQuery = useQuery({
    queryKey: ["fipe", "years", brandId, modelId],
    queryFn: () =>
      fetchJson<YearsResponse>(`/api/fipe/years/${brandId}/${modelId}`),
    enabled: !!brandId && !!modelId,
  });

  // Preço: quando o usuário escolhe o ano, pegamos do array de years
  const selectedYear: Year | null =
    yearsQuery.data?.years?.find((y) => y.year_id === yearId) ?? null;

  const brandName =
    brandsQuery.data?.find((b) => String(b.id) === brandId)?.brand ?? "";
  const modelName =
    modelsQuery.data?.find((m) => String(m.id) === modelId)?.model ?? "";

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
    <Container>
      <div className="py-10 max-w-xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Consulta Tabela FIPE
          </h1>
          <p className="mt-2 text-muted-foreground">
            Selecione o tipo, marca, modelo e ano para ver o valor de
            referência.
          </p>
        </div>

        {/* Tipo */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Tipo de veículo</label>
          <TypeSelector value={type} onChange={handleTypeChange} />
        </div>

        {/* Marca */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Marca</label>
          {brandsQuery.isLoading ? (
            <Loading size={20} />
          ) : brandsQuery.isError ? (
            <p className="text-sm text-destructive">
              {(brandsQuery.error as Error).message}
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

        {/* Modelo */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Modelo</label>
          <ModelSelect
            models={modelsQuery.data ?? []}
            value={modelId}
            onChange={handleModelChange}
            disabled={!brandId}
            loading={modelsQuery.isFetching}
          />
          {modelsQuery.isError && (
            <p className="text-sm text-destructive">
              {(modelsQuery.error as Error).message}
            </p>
          )}
        </div>

        {/* Ano */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Ano</label>
          <YearSelect
            years={yearsQuery.data?.years ?? []}
            value={yearId}
            onChange={setYearId}
            disabled={!modelId}
            loading={yearsQuery.isFetching}
          />
          {yearsQuery.isError && (
            <p className="text-sm text-destructive">
              {(yearsQuery.error as Error).message}
            </p>
          )}
        </div>

        {/* Resultado */}
        {yearId && (
          <PriceResult
            data={selectedYear}
            brandName={brandName}
            modelName={modelName}
            reference={yearsQuery.data?.reference}
            loading={yearsQuery.isFetching}
          />
        )}
      </div>
    </Container>
  );
}