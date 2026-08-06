"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Loading } from "@/components/common/loading";
import { EmptyState } from "@/components/common/empty-state";

export default function VehiclePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  type VehicleItem = { id: string; title: string; price?: string; year?: string; km?: string; location?: string } | null;

  const { data, isLoading } = useQuery<VehicleItem>({
    queryKey: ["vehicle", slug],
    queryFn: async () => {
      const res = await fetch(`/api/vehicles/search?q=&page=1&perPage=50`);
      const json = await res.json();
      // Find item matching slug (mock)
      return (json.items.find((i: any) => i.id === slug) ?? json.items[0]) as VehicleItem;
    },
  });

  const fipeQuery = useQuery<any>({
    queryKey: ["fipe", data?.id],
    queryFn: async () => {
      if (!data) return null;
      try {
        const res = await fetch(`/api/fipe/price/1/1/2010`);
        if (!res.ok) return null;
        return res.json();
      } catch {
        return null;
      }
    },
    enabled: !!data,
  });

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState title="Veículo não encontrado" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">Imagem do veículo</div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Especificações</h2>
            <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
              <li>Ano: {data.year}</li>
              <li>Quilometragem: {data.km}</li>
              <li>Local: {data.location}</li>
            </ul>
          </div>
        </div>

        <aside className="p-4 rounded border bg-card text-card-foreground">
          <div className="text-sm">Preço do anúncio</div>
          <div className="text-xl font-bold mt-2">{data.price}</div>

          <div className="mt-4 text-sm">Valor FIPE (consultado):</div>
          <div className="mt-2 font-medium">{fipeQuery.data ? fipeQuery.data.Valor : '—'}</div>
        </aside>
      </div>
    </div>
  );
}
