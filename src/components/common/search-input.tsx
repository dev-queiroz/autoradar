"use client";

import React from "react";

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Buscar marca, modelo, ano...",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="w-full"
    >
      <label className="relative block">
        <input
          aria-label="Pesquisar"
          className="w-full rounded-md border px-4 py-2 bg-input text-foreground focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </form>
  );
}
