import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductFactory } from '../factories/product.factory';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const authors = await new ProductFactory(em).create(5);
  }

}
