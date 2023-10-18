import { CartItemEntity } from './cart.entity';

export type ORDER_STATUS = /*'created' | 'completed'*/ `${ORDER_STATUS_ENUM}`;

export enum ORDER_STATUS_ENUM {
  CREATED = 'created',
  COMPLETED = 'completed'
}

export interface OrderEntity {
  id: string, // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[] // products from CartEntity
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}