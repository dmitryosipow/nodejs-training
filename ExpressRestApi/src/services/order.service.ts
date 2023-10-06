import { ORDER_STATUS, OrderEntity } from '../schema/types/order.entity';
import { v4 as uuidv4 } from 'uuid';
import { create } from '../repositories/order.repository';
import { deleteCart, getCart } from './cart.service';
import { CheckoutRequestData } from '../controllers/cart.controller';
import { CartItemEntity } from '../schema/types/cart.entity';

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

export const createOrder = (userId:string, data: CheckoutRequestData) => {
  const cart = getCart(userId);
  if (!cart) return null;
  const newOrder: OrderEntity = {
    ...DEFAULT_ORDER,
    ...data,
    items: JSON.parse(JSON.stringify(cart.items)), // deep copy
    cartId: cart.id,
    id: uuidv4(),
    userId
  }

  const total = newOrder.items.reduce((acc, item: CartItemEntity) => {
    return acc + item.product.price * item.count;
  }, 0);

  newOrder.total = total;

  const order = create(newOrder);
  deleteCart(userId);

  return order;
}