import { NextFunction, Request, Response } from 'express';
import { verifyUser } from '../services/user.service';

export const userValidation = (req: Request<{}, any, any,any,{user:string}>, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  if (!userId || !verifyUser(userId)) {
    res.status(401);
    res.send({ message: 'Header x-user-id is missing or no user with such id' });
    return
  }
  next();
}