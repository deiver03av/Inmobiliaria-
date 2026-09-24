import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { PropertyRepository } from "../repositories/property.repository";
import { PropertyService } from "../services/property.service";

const router = Router();

const repository = new PropertyRepository();
const service = new PropertyService(repository);
const controller = new PropertyController(service);

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;