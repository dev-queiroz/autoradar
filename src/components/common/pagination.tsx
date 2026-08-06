"use client";

import React from "react";

export function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) {
  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded border bg-card text-card-foreground disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="px-2">{page} de {totalPages}</span>
      <button
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 rounded border bg-card text-card-foreground disabled:opacity-50"
      >
        Próxima
      </button>
    </nav>
  );
}
