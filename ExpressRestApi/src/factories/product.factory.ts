
import { Product } from '../entities/product.entity';
/*
define(Product, (Faker:Faker) => {
  const title = Faker.commerce.productName();
  const description = Faker.commerce.productDescription();
  const price = Math.random() * 1000;
  const product = new Product(title,description,price);

  return product;
});*/

import { Factory, Faker } from '@mikro-orm/seeder';

export class ProductFactory extends Factory<Product> {
  model = Product;

  definition(faker: Faker): Partial<Product> {
    // @ts-ignore
    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Math.random() * 1000,
    };
  }
}