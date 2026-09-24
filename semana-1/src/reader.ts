// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Property } from './types.js';

export async function readProperties(): Promise<Property[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'properties.json');

  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Property[];
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(
      `No se pudo leer el archivo de propiedades en "${filePath}": ${reason}`
    );
  }
}
