// ============================================
// CONTROLLER — Adapta HTTP (req/res) al dominio
// No contiene lógica de negocio: solo extrae datos del request,
// llama al service y define el shape de la respuesta.
// Los errores se delegan a "next(err)" -> middleware errorHandler.
// ============================================

import type { Request, Response, NextFunction } from 'express';
import { propertyService } from '../services/property.service.js';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { type, city } = req.query;
    const properties = await propertyService.getAll({
      type: typeof type === 'string' ? type : undefined,
      city: typeof city === 'string' ? city : undefined,
    });
    res.status(200).json({ total: properties.length, data: properties });
  } catch (err) {
    next(err);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const property = await propertyService.getById(req.params.id);
    res.status(200).json({ data: property });
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const newProperty = await propertyService.create(req.body);
    res.status(201).json({ data: newProperty });
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await propertyService.update(req.params.id, req.body);
    res.status(200).json({ data: updated });
  } catch (err) {
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await propertyService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export const propertyController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
