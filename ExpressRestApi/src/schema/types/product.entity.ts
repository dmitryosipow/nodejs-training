import Joi from 'joi';

export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
}

export const product: ProductEntity = {
  id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
  title: 'Book',
  description: 'A very interesting book',
  price: 100
}

export const productUpdateSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number().integer().min(0)
})