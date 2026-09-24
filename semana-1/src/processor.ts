// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { Property, PropertySummary } from './types.js';

export function filterByType(
  properties: Property[],
  typeFilter: string | null
): Property[] {
  if (typeFilter === null) {
    return properties;
  }

  const normalizedFilter = typeFilter.toLowerCase();
  const filtered = properties.filter(
    (p) => p.type.toLowerCase() === normalizedFilter
  );

  if (filtered.length === 0) {
    const availableTypes = Array.from(
      new Set(properties.map((p) => p.type))
    ).join(', ');
    throw new Error(
      `No hay propiedades del tipo "${typeFilter}". Tipos disponibles: ${availableTypes}`
    );
  }

  return filtered;
}

export function calculateSummary(properties: Property[]): PropertySummary {
  if (properties.length === 0) {
    throw new Error('No hay propiedades para calcular el resumen.');
  }

  const total = properties.length;
  const available = properties.filter((p) => p.available).length;
  const unavailable = total - available;

  const totalPrice = properties.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = Math.round((totalPrice / total) * 100) / 100;

  const mostExpensive = properties.reduce((max, p) =>
    p.price > max.price ? p : max
  );
  const cheapest = properties.reduce((min, p) =>
    p.price < min.price ? p : min
  );

  const types = Array.from(new Set(properties.map((p) => p.type)));

  return {
    total,
    available,
    unavailable,
    averagePrice,
    mostExpensive,
    cheapest,
    types,
  };
}
