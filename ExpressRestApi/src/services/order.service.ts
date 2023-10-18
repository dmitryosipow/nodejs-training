import { ORDER_STATUS, ORDER_STATUS_ENUM, OrderEntity } from '../schema/types/order.entity';
import { v4 as uuidv4 } from 'uuid';
import { create } from '../repositories/order.repository';
import { deleteCart, getCart } from './cart.service';
import { CheckoutRequestData } from '../controllers/cart.controller';
import { CartItemEntity } from '../schema/types/cart.entity';
import { CartItem } from '../entities/cartItem.entity';
import { Order } from '../entities/order.entity';
import { Loaded, LoadedCollection, LoadedReference, Reference, wrap } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { Cart } from '../entities/cart.entity';
import { DI } from '../index';
import { findAndPopulate } from '../repositories/cart.repository';
import { Product } from '../entities/product.entity';

const DEFAULT_ORDER = {
  items: [],
  payment: {
    type: 'Basic'
  },
  delivery: {
    type: 'Basic',
    address: ''
  },
  comments: '',
  total: 0,
  status: 'created' as ORDER_STATUS
}

export const calculateTotalCartPrice = ( cart: Loaded<Cart, "items" | "items.product">) => {
  const total = cart.items?.reduce((acc, item) => {
    // TODO: item.product.price doesn't work here, ts compiler error
    return acc + (item.product as never as Product).price * item.count;
  }, 0);
  return total;
}

export const createOrder = async (userId:string, data: CheckoutRequestData) => {
  const order = await create(userId, data);
  await deleteCart(userId);

  return order;
}