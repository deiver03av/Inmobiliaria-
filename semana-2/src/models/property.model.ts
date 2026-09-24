// ============================================
// MODELO — Dominio: Inmobiliaria
// Recurso: Property (Propiedad)
// ============================================

export type PropertyType = 'casa' | 'apartamento' | 'local' | 'oficina' | 'terreno';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  area: number; // metros cuadrados
  city: string;
  available: boolean;
}

// DTO para crear una propiedad: no incluye "id" (lo genera el servidor)
export type CreatePropertyDTO = Omit<Property, 'id'>;

// DTO para actualizar: todos los campos opcionales (PATCH-like), sin "id"
export type UpdatePropertyDTO = Partial<Omit<Property, 'id'>>;
