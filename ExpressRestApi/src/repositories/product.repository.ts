import { ProductEntity } from '../schema/types/product.entity';
import { DI } from '../index';

const products: ProductEntity[] = [
  {
    id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: 100
  },
  {
    id: '31422fcd-0366-4186-ad5b-c23059b6f64a',
    title: 'Toy',
    description: 'Sample toy',
    price: 50
  }
];

export const getAll = async () => {
  const products = await DI.productRepository.findAll();
  return products;
}

export const getById = async (id: string) => {
  const product = await DI.productRepository.findOne({ id });
  return product;
}