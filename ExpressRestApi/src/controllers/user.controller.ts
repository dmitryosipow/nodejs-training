import express, { NextFunction, Request, Response } from 'express';
import { userValidation } from '../utils/user.validation';
import { getProducts } from '../services/product.service';
import { getUsers, verifyUser } from '../services/user.service';

const userRouter = express.Router();

userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await getUsers();

  res.status(200);
  res.send({ data: users });
});

userRouter.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id') as string;
  const verified = await verifyUser(userId);

  res.status(200);
  res.send({ data: verified });
});

export default userRouter;