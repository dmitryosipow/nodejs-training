import {OneToOne, Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Ref} from "@mikro-orm/core";
import { Cart } from './cart.entity';
import { CartItem } from './cartItem.entity';
import { Order } from './order.entity';

export interface UserEntity {
  id: string; // uuid
}

const user: UserEntity = {
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}



@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @OneToOne(() => Cart, cart => cart.user, {owner: true, nullable: true})
  cart?: Cart;

  @Property()
  name!: string;

  @OneToMany(() => Order, orderEntity => orderEntity.user)
  orders?: Collection<Order> = new Collection<Order>(this);

  constructor(name: string) {
    this.name = name;
  }
}