import { getAll, getById } from '../repositories/product.repository';


export const getProducts = () => {
  return getAll();
}

export const getProductById = (id:string) => {
  return getById(id);
}