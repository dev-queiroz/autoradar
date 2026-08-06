"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { SearchInput } from "@/components/common/search-input";
import { VehicleCard } from "@/components/common/vehicle-card";
import { Pagination } from "@/components/common/pagination";
import { Loading } from "@/components/common/loading";
import { EmptyState } from "@/components/common/empty-state";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  type SearchResult = { page: number; perPage: number; total: number; totalPages: number; items: any[] };

  const { data, isLoading } = useQuery<SearchResult>({
    queryKey: ["search", query, page],
    queryFn: async () => {
      const res = await fetch(`/api/vehicles/search?q=${encodeURIComponent(query)}&page=${page}&perPage=8`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <SearchInput value={query} onChange={setQuery} onSubmit={() => setPage(1)} />

        <div className="mt-6">
          {isLoading ? (
            <Loading />
          ) : !data || (data.items?.length ?? 0) === 0 ? (
            <EmptyState title="Nenhum resultado" description="Tente outra busca" />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data!.items.map((v: any) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Pagination page={data!.page} totalPages={data!.totalPages} onPage={(p) => setPage(p)} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
