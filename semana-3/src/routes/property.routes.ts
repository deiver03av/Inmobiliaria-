import { Router } from "express";

import { PropertyController } from "../controllers/property.controller";
import { PropertyRepository } from "../repositories/property.repository";
import { PropertyService } from "../services/property.service";

import {
  createPropertySchema,
  updatePropertySchema
} from "../dtos/property.dto";

import { validate } from "../middlewares/validate.middleware";

const router = Router();

const repository = new PropertyRepository();
const service = new PropertyService(repository);
const controller = new PropertyController(service);

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post(
  "/",
  validate(createPropertySchema),
  controller.create
);

router.put(
  "/:id",
  validate(updatePropertySchema),
  controller.update
);

router.delete("/:id", controller.delete);

export default router;