# 🏠 Proyecto Semana 1 — Procesador de Propiedades Inmobiliarias

## Dominio asignado: Inmobiliaria

Este proyecto aplica los conceptos de Node.js + TypeScript (módulos ESM, async/await,
`fs/promises`, manejo de errores) a un caso real de gestión inmobiliaria.

### Entidades del dominio (bootcamp completo)

Mi dominio de **Inmobiliaria** trabaja con 4 entidades a lo largo del bootcamp:

| Entidad | Descripción | Semana donde se introduce |
|---|---|---|
| **Propiedad** | Inmueble en venta o arriendo (casa, apartamento, local, oficina, terreno) | Semana 1 (este proyecto) |
| **Agente** | Asesor inmobiliario que gestiona propiedades y contratos | Semana 5-8 (BD + auth) |
| **Cliente** | Persona interesada en comprar/arrendar una propiedad | Semana 5-8 (BD + auth) |
| **Contrato** | Documento que relaciona Propiedad + Cliente + Agente (venta o arriendo) | Semana 5-8+ (relaciones) |

Para la Semana 1 se trabaja únicamente con **Propiedad**, ya que el proyecto pide un
solo recurso plano en JSON (sin base de datos ni relaciones todavía).

### Recurso de esta semana: `Property`

```ts
interface Property {
  id: string;
  title: string;      // título del anuncio
  type: string;        // casa | apartamento | local | oficina | terreno
  price: number;        // precio en COP
  area: number;          // metros cuadrados
  city: string;
  available: boolean;   // disponible para venta/arriendo
}
```

## Funcionalidad

- Lee `data/properties.json` con `fs/promises`.
- Calcula un resumen: total, disponibles/no disponibles, precio promedio, propiedad
  más cara y más económica, tipos únicos.
- Filtra por tipo de propiedad con `--category` (ej: `casa`, `apartamento`).
- Escribe el reporte en `output/report.json`.
- Maneja errores: archivo no encontrado y tipo de propiedad inexistente
  (termina con `process.exit(1)`).

## Cómo correr el proyecto

```bash
pnpm install
pnpm build                          # verifica TypeScript estricto sin errores
pnpm dev                            # muestra todas las propiedades
pnpm dev -- --category casa         # filtra por tipo
pnpm dev -- --category apartamento
```

Ver `logs.txt` para la evidencia de ejecución con distintos argumentos, incluyendo
el caso de error (categoría inexistente).

## Estructura

```
.
├── data/properties.json     # catálogo de propiedades (12 registros)
├── output/report.json       # reporte generado por la herramienta
├── src/
│   ├── types.ts             # interfaces Property, PropertySummary, Report
│   ├── reader.ts            # lectura del JSON
│   ├── processor.ts         # filtro y cálculo de resumen
│   ├── writer.ts            # escritura del reporte
│   └── index.ts             # entry point / orquestación
├── logs.txt                 # evidencia de ejecución (entregable)
├── package.json
└── tsconfig.json
```
