import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Ref} from "@mikro-orm/core";
import { ProductEntity } from '../schema/types/product.entity';

export interface UserEntity {
  id: string; // uuid
}

const user: UserEntity = {
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}

const products: ProductEntity[] = [
  {
    id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: 100
  },
  {
    id: '31422fcd-0366-4186-ad5b-c23059b6f64a',
    title: 'Toy',
    description: 'Sample toy',
    price: 50
  }
];

@Entity()
export class Product {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  }
}