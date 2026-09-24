# 🏠 Semana 2 — API REST de Propiedades (Express)

## Dominio: Inmobiliaria — Recurso: Property

CRUD completo sobre el recurso `Property`, construido con Express + TypeScript,
siguiendo el patrón **Route → Controller → Service → Repository**:

- **routes/**: define los endpoints y qué controlador atiende cada uno.
- **controllers/**: traducen HTTP (req/res) a llamadas de negocio. No tienen lógica.
- **services/**: reglas de negocio y validaciones del dominio.
- **repositories/**: acceso a datos (hoy: `properties.json`; mañana: base de datos).
- **middlewares/**: `notFound` (rutas inexistentes) y `errorHandler` (manejo
  centralizado de errores vía `ApiError`).

## Cómo correr el proyecto

```bash
pnpm install
pnpm dev
# Servidor en http://localhost:3000
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/properties` | Lista todas las propiedades. Filtros opcionales: `?type=casa`, `?city=Bogotá` |
| GET | `/api/properties/:id` | Obtiene una propiedad por id |
| POST | `/api/properties` | Crea una propiedad |
| PUT | `/api/properties/:id` | Actualiza una propiedad (campos parciales) |
| DELETE | `/api/properties/:id` | Elimina una propiedad |

### Ejemplo — Crear propiedad

```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Apartaestudio en Laureles",
    "type": "apartamento",
    "price": 280000000,
    "area": 42,
    "city": "Medellín",
    "available": true
  }'
```

### Ejemplo — Filtrar por tipo

```bash
curl "http://localhost:3000/api/properties?type=casa"
```

### Manejo de errores

Todos los errores de negocio (validación, no encontrado, etc.) se lanzan como
`ApiError` desde el `service` y se resuelven en un único formato de respuesta:

```json
{
  "error": {
    "message": "El campo \"price\" debe ser un número mayor a 0."
  }
}
```

## Próximos pasos (semanas siguientes)

- Semana 3-4: middlewares de validación con librería (zod/express-validator), tests.
- Semana 5-8: persistencia en base de datos real, autenticación, entidades
  Cliente/Agente/Contrato relacionadas con Property.
