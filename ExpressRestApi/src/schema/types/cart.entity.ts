import { ProductEntity, productUpdateSchema } from './product.entity'
import Joi from 'joi';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export const cartItemsSchema = Joi.array().items(
  Joi.object({
    product: productUpdateSchema,
    count: Joi.number()
    .integer()
    .min(0)
  }));
