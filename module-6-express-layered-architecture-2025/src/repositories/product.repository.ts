import { ProductEntity } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { products } from '../data/products';

export const getAllProducts = (): ProductEntity[] => products;

export const getProductById = (id: string): ProductEntity | undefined => {
  return products.find(product => product.id === id);
};

export const createProduct = (product: Omit<ProductEntity, 'id'>): ProductEntity => {
  const newProduct = { ...product, id: uuidv4() };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, product: Partial<ProductEntity>): ProductEntity | undefined => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  products[index] = { ...products[index], ...product };
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};