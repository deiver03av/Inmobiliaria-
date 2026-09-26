import { z } from "zod";

export const createPropertySchema = z.object({
  title: z.string()
    .min(3, "El título debe tener mínimo 3 caracteres"),

  city: z.string()
    .min(2, "La ciudad debe tener mínimo 2 caracteres"),

  price: z.number()
    .positive("El precio debe ser mayor que 0"),

  bedrooms: z.number()
    .int("Las habitaciones deben ser un número entero")
    .min(1, "Debe tener al menos 1 habitación"),

  bathrooms: z.number()
    .int("Los baños deben ser un número entero")
    .min(1, "Debe tener al menos 1 baño"),

  type: z.string()
    .min(2, "El tipo de propiedad es obligatorio")
});

export const updatePropertySchema = z.object({
  title: z.string()
    .min(3, "El título debe tener mínimo 3 caracteres")
    .optional(),

  city: z.string()
    .min(2, "La ciudad debe tener mínimo 2 caracteres")
    .optional(),

  price: z.number()
    .positive("El precio debe ser mayor que 0")
    .optional(),

  bedrooms: z.number()
    .int("Las habitaciones deben ser un número entero")
    .min(1, "Debe tener al menos 1 habitación")
    .optional(),

  bathrooms: z.number()
    .int("Los baños deben ser un número entero")
    .min(1, "Debe tener al menos 1 baño")
    .optional(),

  type: z.string()
    .min(2, "El tipo de propiedad es obligatorio")
    .optional()
});

export type CreatePropertyDto = z.infer<typeof createPropertySchema>;

export type UpdatePropertyDto = z.infer<typeof updatePropertySchema>;