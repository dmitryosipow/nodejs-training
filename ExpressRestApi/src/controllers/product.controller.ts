import express, { NextFunction, Request, Response } from 'express';
import { createCart, deleteCart, getCart, updateCart } from '../services/cart.service';
import { createOrder } from '../services/order.service';
import { OrderEntity } from '../schema/types/order.entity';
import { userValidation } from '../utils/user.validation';
import { cartItemsSchema } from '../schema/types/cart.entity';
import { getProductById, getProducts } from '../services/product.service';

const productRouter = express.Router();

productRouter.get('/api/profile/products',userValidation, (req: Request, res: Response, next: NextFunction) => {
  const products = getProducts();

  res.status(200);
  res.send({ data: products });
});

productRouter.get('/api/profile/products/:productId',userValidation, (req: Request<{ productId: string }>, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const product = getProductById(productId);

  if (!product) {
    res.status(404);
    res.send({ message: 'No product was found with such id' });
  }

  res.status(200);
  res.send({ data: product });
});


export default productRouter;