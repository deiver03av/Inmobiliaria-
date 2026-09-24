// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================

import { readProperties } from './reader.js';
import { filterByType, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

function parseTypeFilter(): string | null {
  const args = process.argv.slice(2);
  const typeIndex = args.indexOf('--category'); // se mantiene "--category" según el enunciado
  return typeIndex !== -1 ? args[typeIndex + 1] ?? null : null;
}

async function main(): Promise<void> {
  try {
    const typeFilter = parseTypeFilter();

    const allProperties = await readProperties();
    const filteredProperties = filterByType(allProperties, typeFilter);
    const summary = calculateSummary(filteredProperties);

    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: typeFilter,
      summary,
      properties: filteredProperties,
    };

    console.log('🏠 Resumen del catálogo de propiedades');
    console.log('----------------------------------------');
    if (typeFilter) console.log(`Filtro aplicado: ${typeFilter}`);
    console.log(`Total: ${summary.total}`);
    console.log(`Disponibles: ${summary.available}`);
    console.log(`No disponibles: ${summary.unavailable}`);
    console.log(`Precio promedio: $${summary.averagePrice.toLocaleString('es-CO')}`);
    console.log(`Más cara: ${summary.mostExpensive.title} ($${summary.mostExpensive.price.toLocaleString('es-CO')})`);
    console.log(`Más económica: ${summary.cheapest.title} ($${summary.cheapest.price.toLocaleString('es-CO')})`);
    console.log(`Tipos: ${summary.types.join(', ')}`);

    await writeReport(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`\n❌ Error: ${message}`);
    process.exit(1);
  }
}

main();
