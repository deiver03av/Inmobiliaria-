// ============================================
// ROUTES — Define los endpoints del recurso /properties
// ============================================

import { Router } from 'express';
import { propertyController } from '../controllers/property.controller.js';

export const propertyRouter = Router();

// GET    /api/properties?type=casa&city=Bogotá
propertyRouter.get('/', propertyController.getAll);

// GET    /api/properties/:id
propertyRouter.get('/:id', propertyController.getById);

// POST   /api/properties
propertyRouter.post('/', propertyController.create);

// PUT    /api/properties/:id
propertyRouter.put('/:id', propertyController.update);

// DELETE /api/properties/:id
propertyRouter.delete('/:id', propertyController.remove);
