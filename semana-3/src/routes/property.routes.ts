import { Router } from "express";
import {
  createPropertySchema,
  updatePropertySchema
} from "../dtos/property.dto";

import { validate } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

import { PropertyRepository } from "../repositories/property.repository";
import { PropertyService } from "../services/property.service";
import { PropertyController } from "../controllers/property.controller";

const router = Router();

const repository = new PropertyRepository();
const service = new PropertyService(repository);
const controller = new PropertyController(service);

// Consultar propiedades
router.get("/", controller.getAll);

router.get("/:id", controller.getById);

// Crear propiedad → requiere JWT
router.post(
  "/",
  authMiddleware,
  validate(createPropertySchema),
  controller.create
);

// Actualizar propiedad → requiere JWT
router.put(
  "/:id",
  authMiddleware,
  validate(updatePropertySchema),
  controller.update
);

// Eliminar propiedad → requiere JWT
router.delete(
  "/:id",
  authMiddleware,
  controller.delete
);

export default router;