export interface CreatePropertyDto {
  title: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
}

export interface UpdatePropertyDto {
  title?: string;
  city?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
}