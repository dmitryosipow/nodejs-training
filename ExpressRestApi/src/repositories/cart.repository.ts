import { v4 as uuidv4 } from 'uuid';
import { product as bookProduct } from '../schema/types/product.entity';
import { CartEntity, CartItemEntity } from '../schema/types/cart.entity';

const cartItem: CartItemEntity = {
  product: bookProduct,
  count: 2,
}

const carts: CartEntity[] = [{
  id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  isDeleted: false,
  items: [cartItem],
}]

export const getCartByUserId = (userId:string) => {
  const cart = carts.find(cart => cart.userId === userId);
  return cart && !cart.isDeleted ? cart : null;
}

export const getCartIdByUserId = (userId:string) => {
  return carts.find(cart => cart.userId === userId)?.id || ''
}

export const create = (userId:string) => {
  const newCart = {
    id: uuidv4(),
    userId,
    isDeleted: false,
    items: []
  }
  carts.push(newCart);
  return newCart;
}

export const update = (id:string, items: CartItemEntity[]) => {
  const cart = carts.find(cart => cart.id === id);
  if(!cart || cart.isDeleted) return null;
  Object.assign(cart, { items });
  return cart;
}

export const deleteOne = (id:string) => {
  const cart = carts.find(cart => cart.userId === id);
  if(!cart || cart.isDeleted) return null;
  cart.isDeleted = true;
  return true;
}