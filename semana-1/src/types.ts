// ============================================
// TIPOS — Dominio: Inmobiliaria
// Recurso: Property (Propiedad)
// ============================================

export interface Property {
  id: string;
  title: string;
  type: string; // casa, apartamento, local, oficina, terreno
  price: number;
  area: number; // metros cuadrados
  city: string;
  available: boolean; // disponible para venta/arriendo
}

// Resumen que el procesador calcula sobre el catálogo
export interface PropertySummary {
  total: number;
  available: number;
  unavailable: number;
  averagePrice: number;
  mostExpensive: Property;
  cheapest: Property;
  types: string[];
}

// Reporte final que se escribe en output/report.json
export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: PropertySummary;
  properties: Property[];
}
