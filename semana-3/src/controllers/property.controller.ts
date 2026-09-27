import { Request, Response } from "express";
import {
  CreatePropertyDto,
  UpdatePropertyDto
} from "../dtos/property.dto";
import { PropertyService } from "../services/property.service";

export class PropertyController {
  constructor(private readonly service: PropertyService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 5, 1);

    const result = await this.service.getProperties(page, limit);

    res.status(200).json(result);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);

    const property = await this.service.getPropertyById(id);

    if (!property) {
      res.status(404).json({
        error: "Not Found",
        message: `Property ${id} not found`
      });
      return;
    }

    res.status(200).json({
      data: property
    });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const data = req.body as CreatePropertyDto;

    const property = await this.service.createProperty(data);

    res.status(201).json({
      data: property
    });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);
    const data = req.body as UpdatePropertyDto;

    const property = await this.service.updateProperty(id, data);

    if (!property) {
      res.status(404).json({
        error: "Not Found",
        message: `Property ${id} not found`
      });
      return;
    }

    res.status(200).json({
      data: property
    });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);

    const deleted = await this.service.deleteProperty(id);

    if (!deleted) {
      res.status(404).json({
        error: "Not Found",
        message: `Property ${id} not found`
      });
      return;
    }

    res.status(204).send();
  };
}