import { Property } from "../models/property.model";
import { CreatePropertyDto, UpdatePropertyDto } from "../dtos/property.dto";
import { prisma } from "../lib/prisma";

export class PropertyRepository {
  async findAll(): Promise<Property[]> {
    return await prisma.property.findMany();
  }

  async findById(id: number): Promise<Property | undefined> {
    const property = await prisma.property.findUnique({
      where: { id }
    });

    return property ?? undefined;
  }

  async create(data: CreatePropertyDto): Promise<Property> {
    return await prisma.property.create({
      data
    });
  }

  async update(
    id: number,
    data: UpdatePropertyDto
  ): Promise<Property | undefined> {
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    });

    if (!existingProperty) {
      return undefined;
    }

    return await prisma.property.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<boolean> {
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    });

    if (!existingProperty) {
      return false;
    }

    await prisma.property.delete({
      where: { id }
    });

    return true;
  }
}