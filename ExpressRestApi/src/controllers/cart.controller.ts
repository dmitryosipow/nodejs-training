import express, { NextFunction, Request, Response } from 'express';
import { createCart, deleteCart, getCart, updateCart } from '../services/cart.service';
import { createOrder } from '../services/order.service';
import { OrderEntity } from '../schema/types/order.entity';
import { userValidation } from '../utils/user.validation';
import { cartItemsSchema } from '../schema/types/cart.entity';

const cartRouter = express.Router();

const createOrFindCart = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id') as string;

  let cart = getCart(userId);

  if(!cart) {
    cart = createCart(userId);
  }

  res.status(200);
  res.send({ cart });
}

cartRouter.get('/api/profile/cart', userValidation, createOrFindCart);
cartRouter.post('/api/profile/cart', userValidation, createOrFindCart);

cartRouter.put('/api/profile/cart',userValidation, (req: Request, res: Response, next: NextFunction) => {
  const cartId = req.body.id;
  const cartItems = req.body.items;
  const validation = cartItemsSchema.validate(cartItems);
  if (validation.error) {
    console.log(cartItems);
    console.log('---');
    console.log(validation.error);
    res.status(400);
    res.send({ message: validation.error.message });
    return
  }
  let cart = updateCart(cartId, cartItems);

  if(!cart) {
    res.status(400);
    res.send({ message: 'No cart with provided id has been found' });
    return
  }

  res.status(200);
  res.send({ data: { cart } });
});

cartRouter.delete('/api/profile/cart',userValidation, (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id') as string;

  let cart = deleteCart(userId);

  if(!cart) {
    res.status(400);
    res.send({ message: 'No cart with provided user id has been found' });
    return
  }

  res.status(200);
  res.send({ success: true });
});

export type CheckoutRequestData = Omit<OrderEntity, 'id'|'userId'|'cartId'|'items'>;

cartRouter.post('/api/profile/cart/checkout', userValidation, (req: Request<{}, any, { data: CheckoutRequestData }>, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id') as string;

  let order = createOrder(userId, req.body.data);

  if(!order) {
    res.status(400);
    res.send({ message: 'No cart with provided user id has been found' });
    return
  }

  res.status(200);
  res.send({ data: order });
});

export default cartRouter;