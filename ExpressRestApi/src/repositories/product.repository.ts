import { ProductEntity } from '../schema/types/product.entity';

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

export const getAll = () => {
  return products;
}

export const getById = (id: string) => {
  return products.find(prod => prod.id === id);
}