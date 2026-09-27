import { Property } from "../models/property.model";
import {
  CreatePropertyDto,
  UpdatePropertyDto
} from "../dtos/property.dto";
import { PropertyModel } from "../models/property.schema";

export class PropertyRepository {
  async findAll(): Promise<Property[]> {
    const properties = await PropertyModel.find().lean();

    return properties.map((property) => ({
      id: property._id.toString(),
      title: property.title,
      city: property.city,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      type: property.type
    }));
  }

  async findById(id: string): Promise<Property | undefined> {
    const property = await PropertyModel.findById(id).lean();

    if (!property) {
      return undefined;
    }

    return {
      id: property._id.toString(),
      title: property.title,
      city: property.city,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      type: property.type
    };
  }

  async create(data: CreatePropertyDto): Promise<Property> {
    const property = await PropertyModel.create(data);

    return {
      id: property._id.toString(),
      title: property.title,
      city: property.city,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      type: property.type
    };
  }

  async update(
    id: string,
    data: UpdatePropertyDto
  ): Promise<Property | undefined> {
    const property = await PropertyModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    ).lean();

    if (!property) {
      return undefined;
    }

    return {
      id: property._id.toString(),
      title: property.title,
      city: property.city,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      type: property.type
    };
  }

  async delete(id: string): Promise<boolean> {
    const property = await PropertyModel.findByIdAndDelete(id);

    return property !== null;
  }
}