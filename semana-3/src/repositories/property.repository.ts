import { properties } from "../data/properties.data";
import { Property } from "../models/property.model";
import { CreatePropertyDto, UpdatePropertyDto } from "../dtos/property.dto";

export class PropertyRepository {
  async findAll(): Promise<Property[]> {
    return properties;
  }

  async findById(id: number): Promise<Property | undefined> {
    return properties.find((property) => property.id === id);
  }

  async create(data: CreatePropertyDto): Promise<Property> {
    const newId =
      properties.length > 0
        ? Math.max(...properties.map((property) => property.id)) + 1
        : 1;

    const newProperty: Property = {
      id: newId,
      ...data
    };

    properties.push(newProperty);

    return newProperty;
  }

  async update(
    id: number,
    data: UpdatePropertyDto
  ): Promise<Property | undefined> {
    const index = properties.findIndex((property) => property.id === id);

    if (index === -1) {
      return undefined;
    }

    properties[index] = {
      ...properties[index],
      ...data,
      id
    };

    return properties[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = properties.findIndex((property) => property.id === id);

    if (index === -1) {
      return false;
    }

    properties.splice(index, 1);

    return true;
  }
}