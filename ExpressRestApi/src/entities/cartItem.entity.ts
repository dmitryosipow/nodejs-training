import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @ManyToOne(() => Product)
  product!: Ref<Product>;

  @Property()
  count!: number;

  @Property({ nullable: true })
  purchasePrice?: number;

  @ManyToOne(() => Cart, {hidden: true})
  cart!: Cart;
}