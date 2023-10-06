import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cartRouter from './controllers/cart.controller';
import productRouter from './controllers/product.controller';

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.send({ message: err.message });
};


app.use('/', cartRouter);
app.use('/', productRouter);
app.use('/', errorHandler);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.send({ message: 'Page not found' });
});

app.listen(3000, () => {
  console.log('Server is started');
})