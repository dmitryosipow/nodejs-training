import express, { NextFunction, Request, Response } from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import bodyParser from 'body-parser';
import http from 'http';
import cartRouter from './controllers/cart.controller';
import productRouter from './controllers/product.controller';
import userController from './controllers/user.controller';
import cartController from './controllers/cart.controller';
import productController from './controllers/product.controller';

import config from './config/orm.config'
import { User } from './entities/user.entity';
import { Cart } from './entities/cart.entity';
import { Product } from './entities/product.entity';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
  cartRepository: EntityRepository<Cart>,
  productRepository: EntityRepository<Product>
};

const init = (async () => {
  const app = express();
  const port = 3000;

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.cartRepository = DI.orm.em.getRepository(Cart);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  app.use('/', userController);
  app.use('/', cartController);
  app.use('/', productController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();


/*
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
});*/
/*
const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'node_gmp',
  password: 'password123',
  database: 'node_gmp'
});*/

/*
(async () => {
  await client.connect();
/*
  await client.query(`
    CREATE TABLE IF NOT EXISTS Employee ( 
        id serial PRIMARY KEY,
        name character varying NOT NULL,
        joinDate TIMESTAMP WITH TIME ZONE NOT NULL);`);
  await client.query(`
    CREATE TABLE IF NOT EXISTS Employee ( 
        id serial PRIMARY KEY,
        name character varying NOT NULL,
        joinDate TIMESTAMP WITH TIME ZONE NOT NULL);`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Hardware (
        "Serial" character varying PRIMARY KEY,
        os character varying NOT NULL,
        year integer NOT NULL,
        ram integer NOT NULL,
        employeeId integer,
        CONSTRAINT fk_employee FOREIGN KEY(employeeId) REFERENCES Employee(id)
    );`);

  await client.query(`
    INSERT INTO Employee (name, joinDate) 
    VALUES 
    ('John Wick', '2021-01-14'),
    ('Alex Green', '2019-04-14') 
`);

//we pass only Serial, os,year,ram column values, employeeId is empty
  await client.query(`
    INSERT INTO Hardware 
    VALUES 
    ('serialNum1', 'MAC',2019,18),
    ('serialNum2', 'Windows', 2019, 36)`);

  const employee = await client.query(
    `SELECT id from Employee where name = $1`,
    ['John Wick']
  );

  console.log(employee.rows); // [ { id: 1 } ]

  await client.query(
    `UPDATE Hardware SET employeeId = $1 where "Serial" = $2`,
    [employee.rows[0].id, 'serialNum1']
  );*/
/*
  const result = await client.query(
    `SELECT * from Employee JOIN Hardware ON id = employeeId`,
  );

  console.log(result.rows)
})();
*/