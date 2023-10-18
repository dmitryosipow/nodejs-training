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
  Reference
} from "@mikro-orm/core";
import { User } from './user.entity';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @OneToOne(() => User, user => user.cart, { ref: true, hidden: true })
  user!: Ref<User>;

  @Property({default: false, hidden: true})
  isDeleted!: boolean;

  @OneToMany(() => CartItem, cartEntity => cartEntity.cart)
  items: Collection<CartItem> = new Collection<CartItem>(this);

  constructor(userId: string) {
    this.user = Reference.createFromPK(User, userId);
  }
}