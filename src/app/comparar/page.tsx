"use client";

import React from "react";

import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ComparePage() {
  const [left, setLeft] = React.useState("");
  const [right, setRight] = React.useState("");
  const [result, setResult] = React.useState<any>(null);

  async function handleCompare() {
    // For now, fetch mock details by id
    const [lRes, rRes] = await Promise.all([
      fetch(`/api/vehicles/search?q=&page=1&perPage=50`).then((r) => r.json()),
      fetch(`/api/vehicles/search?q=&page=1&perPage=50`).then((r) => r.json()),
    ]);

    const lItem = lRes.items.find((i: any) => i.id === left) ?? null;
    const rItem = rRes.items.find((i: any) => i.id === right) ?? null;
    setResult({ left: lItem, right: rItem });
  }

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-bold">Comparar veículos</h1>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input placeholder="ID veículo esquerdo" value={left} onChange={(e) => setLeft(e.target.value)} />
          <Input placeholder="ID veículo direito" value={right} onChange={(e) => setRight(e.target.value)} />
          <Button onClick={handleCompare}>Comparar</Button>
        </div>

        {result && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Esquerda</h3>
              <pre className="text-sm">{JSON.stringify(result.left, null, 2)}</pre>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Direita</h3>
              <pre className="text-sm">{JSON.stringify(result.right, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
