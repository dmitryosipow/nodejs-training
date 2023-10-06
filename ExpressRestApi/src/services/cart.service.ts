import { getCartByUserId, update, deleteOne, create } from '../repositories/cart.repository';
import { CartItemEntity } from '../schema/types/cart.entity';

export const getCart = (userId:string) => {
  return getCartByUserId(userId)
}

export const updateCart = (userId:string, items: CartItemEntity[]) => {
  return update(userId, items)
}

export const deleteCart = (userId:string) => {
  return deleteOne(userId)
}

export const createCart = (userId:string) => {
  return create(userId)
}