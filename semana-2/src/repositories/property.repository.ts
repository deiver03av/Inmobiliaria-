// ============================================
// REPOSITORY — Acceso a datos
// Responsabilidad única: leer y persistir el archivo properties.json.
// El día que cambiemos a una base de datos (Semana 5-8), solo esta
// capa cambia; services/controllers no se enteran del cambio.
// ============================================

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import type { Property } from '../models/property.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '..', 'data', 'properties.json');

async function readAll(): Promise<Property[]> {
  const raw = await readFile(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as Property[];
}

async function writeAll(properties: Property[]): Promise<void> {
  await writeFile(DATA_PATH, JSON.stringify(properties, null, 2), 'utf-8');
}

export const propertyRepository = {
  readAll,
  writeAll,
};
