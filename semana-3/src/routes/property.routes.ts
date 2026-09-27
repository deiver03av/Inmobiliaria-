import { Router } from "express";
import {
  createPropertySchema,
  updatePropertySchema
} from "../dtos/property.dto";

import { validate } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

import { PropertyRepository } from "../repositories/property.repository";
import { PropertyService } from "../services/property.service";
import { PropertyController } from "../controllers/property.controller";

const router = Router();

const repository = new PropertyRepository();
const service = new PropertyService(repository);
const controller = new PropertyController(service);

// ==========================================
// CONSULTAR PROPIEDADES
// Público: no necesita autenticación
// ==========================================

router.get("/", controller.getAll);

router.get("/:id", controller.getById);


// ==========================================
// CREAR PROPIEDAD
// Usuario y Admin pueden crear
// ==========================================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("usuario", "admin"),
  validate(createPropertySchema),
  controller.create
);


// ==========================================
// ACTUALIZAR PROPIEDAD
// Usuario y Admin pueden actualizar
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("usuario", "admin"),
  validate(updatePropertySchema),
  controller.update
);


// ==========================================
// ELIMINAR PROPIEDAD
// Solamente Admin puede eliminar
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  controller.delete
);

export default router;