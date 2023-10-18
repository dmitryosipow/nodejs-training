import { ORDER_STATUS_ENUM, OrderEntity } from '../schema/types/order.entity';
import { CheckoutRequestData } from '../controllers/cart.controller';
import { getCart } from '../services/cart.service';
import { Order } from '../entities/order.entity';
import { Loaded, LoadedReference, Reference, wrap } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { CartItem } from '../entities/cartItem.entity';
import { calculateTotalCartPrice } from '../services/order.service';
import { DI } from '../index';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

export const create = async (userId:string, data: CheckoutRequestData) => {
  const cart = await getCart(userId);

  if (!cart) return null;
  const newOrder = new Order();
  newOrder.user = Reference.createFromPK(User, userId);
  // TODO: in fact cart with items is already loaded above, but I can't set/assign it.
  // need to create cart object first and then set the loaded cart
  newOrder.cart = Reference.createFromPK(Cart, cart.id);
  newOrder.cart.set(cart);
  for(const cartItem of cart.items) {
    // TODO: item.product.price doesn't work here, ts compiler error
    cartItem.purchasePrice = (cartItem.product as never as Product).price;
  }
  newOrder.status = ORDER_STATUS_ENUM.CREATED;
  newOrder.comments = data.comments;
  newOrder.delivery = data.delivery;
  newOrder.payment = data.payment;
  newOrder.total = calculateTotalCartPrice(cart);
  await DI.em.persistAndFlush(newOrder);

  return newOrder;
}

const orders: OrderEntity[] = [{
  id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  cartId: '',
  items: [],
  payment: {
    type: 'paypal',
    address: undefined,
    creditCard: undefined
  },
  delivery: {
    type: 'post',
    address: undefined
  },
  comments: '',
  status: 'created',
  total: 2,
}];