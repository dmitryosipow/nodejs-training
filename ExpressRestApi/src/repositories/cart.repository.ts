import { v4 as uuidv4 } from 'uuid';
import { product as bookProduct } from '../schema/types/product.entity';
import { CartEntity, CartItemEntity } from '../schema/types/cart.entity';
import { DI } from '../index';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cartItem.entity';
import cartController from '../controllers/cart.controller';
import { wrap } from '@mikro-orm/core';

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

export const getCartByUserId = async (userId:string) => {
  const cart = await DI.cartRepository.findOne({
    user: userId,
    isDeleted: false
  }, {
    populate: ['items', 'items.product']
  });

  return cart && !cart.isDeleted ? cart : null;
}

export const getCartIdByUserId = (userId:string) => {
  return carts.find(cart => cart.userId === userId)?.id || ''
}

export const create = async (userId:string) => {
  const cart = new Cart(userId)

  await DI.em.persistAndFlush(cart);

  return cart;
}

export const findAndPopulate = async (id:string) => {
  return await DI.cartRepository.findOne({
    id
  }, {
    populate: ['items', 'items.product']
  });
}

export const update = async (id:string, updateItems: CartItem[]) => {
  //const cart = carts.find(cart => cart.id === id);
  let cart = await findAndPopulate(id);
  if(!cart || cart.isDeleted) return null;
  // delete items from cart that are not in the update params
  for (const itemEntity of (cart.items || [])) {
    const found = updateItems.findIndex(updateItem => updateItem.id === itemEntity.id);
    if(found < 0)DI.em.remove(itemEntity);
  };
  // assign cart to updated cart items
  for (const updateItem of updateItems) {
    updateItem.cart = cart;
    if(!updateItem.id) {
      updateItem.id = uuidv4();
    }
  }

  await DI.em.upsertMany(CartItem, updateItems);
  await DI.em.flush();

  //await wrap(cart).init()
  cart = await DI.cartRepository.findOne({
    id
  }, {
    populate: ['items', 'items.product']
  });
  return cart;
}

export const deleteOne = async (userId:string) => {
  const cart = await DI.cartRepository.findOne({
    user: userId
  });
  if(!cart || cart.isDeleted) return null;
  cart.isDeleted = true;
  await DI.em.flush();
  return true;
}