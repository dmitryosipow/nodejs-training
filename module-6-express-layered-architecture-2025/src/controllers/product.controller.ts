import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import { ProductEntity } from '../entities/product.entity';

export const getAllProducts = (req: Request, res: Response): void => {
  const products = productService.getAllProducts();
  res.status(200).json({ data: products });
};

export const getProductById = (req: Request, res: Response): void => {
  const product = productService.getProductById(req.params.id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.status(200).json({ data: product });
  }
};

export const createProduct = (req: Request, res: Response): void => {
  const newProduct = productService.createProduct(req.body);
  res.status(201).json({ data: newProduct });
};

export const updateProduct = (req: Request, res: Response): void => {
  const updatedProduct = productService.updateProduct(req.params.id, req.body);
  if (!updatedProduct) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.status(200).json({ data: updatedProduct });
  }
};

export const deleteProduct = (req: Request, res: Response): void => {
  const isDeleted = productService.deleteProduct(req.params.id);
  if (!isDeleted) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.status(200).json({ message: 'Product deleted successfully' });
  }
};