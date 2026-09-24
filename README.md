# 🏠 Inmobiliaria — Bootcamp Node.js / Express.js

Proyecto de dominio **Inmobiliaria** desarrollado a lo largo del bootcamp
(basado en la ruta de `bc-expressjs`). Cada semana vive en su propia carpeta,
de forma autocontenida (su propio `package.json`), para poder evaluar el
avance de cada entrega sin que una semana dependa de otra.

## Estructura

```
inmobiliaria/
├── semana-1/   # ✅ Fundamentos Node.js + TS: CLI que procesa properties.json
├── semana-2/   # ✅ API REST con Express: CRUD de Propiedades
├── semana-3/   # ⬜ (próxima entrega)
└── ...
```

## Entidades del dominio

| Entidad | Descripción | Se introduce en |
|---|---|---|
| **Propiedad** | Inmueble en venta o arriendo | Semana 1 |
| **Cliente** | Persona interesada en comprar/arrendar | Semana 5-8 (BD + auth) |
| **Agente** | Asesor que gestiona propiedades y contratos | Semana 5-8 (BD + auth) |
| **Contrato** | Relaciona Propiedad + Cliente + Agente | Semana 5-8+ |

## Cómo trabajar en este repo

Entra a la carpeta de la semana correspondiente y sigue el README interno:

```bash
cd semana-2
pnpm install
pnpm dev
```
# Inmobiliaria-
