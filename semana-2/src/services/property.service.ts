// ============================================
// SERVICE — Lógica de negocio
// Aquí viven las reglas del dominio y las validaciones.
// El controller NUNCA habla directo con el repository.
// ============================================

import { randomUUID } from 'node:crypto';
import { propertyRepository } from '../repositories/property.repository.js';
import { ApiError } from '../utils/ApiError.js';
import type {
  Property,
  CreatePropertyDTO,
  UpdatePropertyDTO,
  PropertyType,
} from '../models/property.model.js';

const VALID_TYPES: PropertyType[] = ['casa', 'apartamento', 'local', 'oficina', 'terreno'];

function validateCreatePayload(payload: Partial<CreatePropertyDTO>): void {
  const { title, type, price, area, city, available } = payload;

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    throw ApiError.badRequest('El campo "title" es obligatorio (mínimo 3 caracteres).');
  }
  if (!type || !VALID_TYPES.includes(type as PropertyType)) {
    throw ApiError.badRequest(`El campo "type" debe ser uno de: ${VALID_TYPES.join(', ')}.`);
  }
  if (typeof price !== 'number' || price <= 0) {
    throw ApiError.badRequest('El campo "price" debe ser un número mayor a 0.');
  }
  if (typeof area !== 'number' || area <= 0) {
    throw ApiError.badRequest('El campo "area" debe ser un número mayor a 0.');
  }
  if (!city || typeof city !== 'string') {
    throw ApiError.badRequest('El campo "city" es obligatorio.');
  }
  if (typeof available !== 'boolean') {
    throw ApiError.badRequest('El campo "available" debe ser booleano (true/false).');
  }
}

async function getAll(filters: { type?: string; city?: string }): Promise<Property[]> {
  let properties = await propertyRepository.readAll();

  if (filters.type) {
    if (!VALID_TYPES.includes(filters.type as PropertyType)) {
      throw ApiError.badRequest(`El tipo "${filters.type}" no existe. Válidos: ${VALID_TYPES.join(', ')}.`);
    }
    properties = properties.filter((p) => p.type === filters.type);
  }

  if (filters.city) {
    const cityLower = filters.city.toLowerCase();
    properties = properties.filter((p) => p.city.toLowerCase() === cityLower);
  }

  return properties;
}

async function getById(id: string): Promise<Property> {
  const properties = await propertyRepository.readAll();
  const property = properties.find((p) => p.id === id);
  if (!property) {
    throw ApiError.notFound(`No existe una propiedad con id "${id}".`);
  }
  return property;
}

async function create(payload: CreatePropertyDTO): Promise<Property> {
  validateCreatePayload(payload);

  const properties = await propertyRepository.readAll();
  const newProperty: Property = { id: randomUUID(), ...payload };

  properties.push(newProperty);
  await propertyRepository.writeAll(properties);

  return newProperty;
}

async function update(id: string, payload: UpdatePropertyDTO): Promise<Property> {
  const properties = await propertyRepository.readAll();
  const index = properties.findIndex((p) => p.id === id);

  if (index === -1) {
    throw ApiError.notFound(`No existe una propiedad con id "${id}".`);
  }

  if (payload.type && !VALID_TYPES.includes(payload.type as PropertyType)) {
    throw ApiError.badRequest(`El campo "type" debe ser uno de: ${VALID_TYPES.join(', ')}.`);
  }
  if (payload.price !== undefined && (typeof payload.price !== 'number' || payload.price <= 0)) {
    throw ApiError.badRequest('El campo "price" debe ser un número mayor a 0.');
  }
  if (payload.area !== undefined && (typeof payload.area !== 'number' || payload.area <= 0)) {
    throw ApiError.badRequest('El campo "area" debe ser un número mayor a 0.');
  }

  const updated: Property = { ...properties[index], ...payload, id };
  properties[index] = updated;
  await propertyRepository.writeAll(properties);

  return updated;
}

async function remove(id: string): Promise<void> {
  const properties = await propertyRepository.readAll();
  const index = properties.findIndex((p) => p.id === id);

  if (index === -1) {
    throw ApiError.notFound(`No existe una propiedad con id "${id}".`);
  }

  properties.splice(index, 1);
  await propertyRepository.writeAll(properties);
}

export const propertyService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
