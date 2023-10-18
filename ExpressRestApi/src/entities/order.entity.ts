import {
  Collection,
  Entity,
  OneToOne,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Ref,
  Reference, Enum
} from "@mikro-orm/core";
import { User } from './user.entity';
import { CartItem } from './cartItem.entity';
import { ORDER_STATUS, ORDER_STATUS_ENUM, OrderEntity } from '../schema/types/order.entity';
import { Cart } from './cart.entity';

const orders: OrderEntity[] = [{
  id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  cartId: '',
  items: [],
  payment: {
    type: 'paypal',
    address: undefined,
    creditCard: undefined
  },
  delivery: {
    type: 'post',
    address: undefined
  },
  comments: '',
  status: 'created',
  total: 2,
}];

@Entity()
export class Order {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @ManyToOne(() => User, {hidden: true})
  user!: Ref<User>;

  @OneToOne(() => Cart, {ref: true})
  cart!: Ref<Cart>;

  @Property({ type: 'json' })
  payment!: { type: string; address?: string; creditCard?: string };

  @Property({ type: 'json' })
  delivery!: { type: string; address?: string };

  @Property()
  comments?: string;

  @Enum(() => ORDER_STATUS_ENUM)
  status?: ORDER_STATUS;

  @Property()
  total?: number;

  /*constructor(userId: string) {
    this.user = Reference.createFromPK(User, userId);
  }*/
}