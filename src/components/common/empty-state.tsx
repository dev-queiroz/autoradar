"use client";

import React from "react";

export function EmptyState({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-2xl font-semibold">{title ?? 'Nada por aqui'}</div>
      {description && <div className="mt-2 text-sm text-muted-foreground">{description}</div>}
    </div>
  );
}
