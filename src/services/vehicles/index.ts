// Placeholder for future aggregators (Webmotors, Gecko, etc.)
export async function searchVehicles(q = '', page = 1, perPage = 10) {
  const total = 42;
  const totalPages = Math.ceil(total / perPage);
  const items = Array.from({ length: perPage }, (_, i) => {
    const idx = (page - 1) * perPage + i + 1;
    if (idx > total) return null;
    return {
      id: String(idx),
      title: `${q || 'Veículo'} Modelo ${idx}`,
      price: `R$ ${ (30000 + idx * 500).toLocaleString('pt-BR') }`,
      year: `${2010 + (idx % 13)}`,
      km: `${(50000 + idx * 1234).toLocaleString('pt-BR')} km`,
      image: null,
      location: 'São Paulo, SP',
      href: `/veiculos/${idx}`,
    };
  }).filter(Boolean);
  return { page, perPage, total, totalPages, items };
}
