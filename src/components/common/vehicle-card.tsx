"use client";

import React from "react";
import Link from "next/link";

type Vehicle = {
  id: string;
  title: string;
  price?: string;
  year?: string;
  km?: string;
  image?: string;
  location?: string;
  href?: string;
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="rounded-lg border bg-card text-card-foreground overflow-hidden shadow-sm">
      <Link href={vehicle.href ?? '#'} className="block">
        <div className="h-44 bg-gray-100 dark:bg-gray-800 w-full flex items-center justify-center">
          {vehicle.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={vehicle.image} alt={vehicle.title} className="object-cover h-44 w-full" />
          ) : (
            <div className="text-sm text-muted-foreground">Sem imagem</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{vehicle.title}</h3>
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <div>{vehicle.year ?? '—'}</div>
            <div>{vehicle.km ?? '—'}</div>
          </div>
          <div className="mt-3 text-sm font-medium">{vehicle.price ?? '—'}</div>
          {vehicle.location && <div className="mt-1 text-xs text-muted-foreground">{vehicle.location}</div>}
        </div>
      </Link>
    </article>
  );
}
