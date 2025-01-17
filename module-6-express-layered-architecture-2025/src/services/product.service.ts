import * as productRepository from '../repositories/product.repository';
import { ProductEntity } from '../entities/product.entity';

export const getAllProducts = (): ProductEntity[] => {
  return productRepository.getAllProducts();
};

export const getProductById = (id: string): ProductEntity | undefined => {
  return productRepository.getProductById(id);
};

export const createProduct = (product: Omit<ProductEntity, 'id'>): ProductEntity => {
  return productRepository.createProduct(product);
};

export const updateProduct = (id: string, product: Partial<ProductEntity>): ProductEntity | undefined => {
  return productRepository.updateProduct(id, product);
};

export const deleteProduct = (id: string): boolean => {
  return productRepository.deleteProduct(id);
};