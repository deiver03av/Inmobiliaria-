import {
  CreatePropertyDto,
  UpdatePropertyDto
} from "../dtos/property.dto";
import { PropertyRepository } from "../repositories/property.repository";

export class PropertyService {
  constructor(private readonly repository: PropertyRepository) {}

  async getProperties(page: number, limit: number) {
    const properties = await this.repository.findAll();

    const total = properties.length;

    const start = (page - 1) * limit;
    const end = start + limit;

    const data = properties.slice(start, end);

    return {
      data,
      total,
      page,
      limit
    };
  }

  async getPropertyById(id: number) {
    return this.repository.findById(id);
  }

  async createProperty(data: CreatePropertyDto) {
    return this.repository.create(data);
  }

  async updateProperty(id: number, data: UpdatePropertyDto) {
    return this.repository.update(id, data);
  }

  async deleteProperty(id: number) {
    return this.repository.delete(id);
  }
} 