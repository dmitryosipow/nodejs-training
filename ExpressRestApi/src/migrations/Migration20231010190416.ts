import { Migration } from '@mikro-orm/migrations';

export class Migration20231010190416 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cart" ("id" uuid not null default uuid_generate_v4(), "is_deleted" boolean not null default false, constraint "cart_pkey" primary key ("id"));');

    this.addSql('create table "product" ("id" uuid not null default uuid_generate_v4(), "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "cart_item" ("id" uuid not null default uuid_generate_v4(), "product_id" uuid not null, "count" int not null, "cart_id" uuid not null, constraint "cart_item_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), "cart_id" uuid null, "name" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_cart_id_unique" unique ("cart_id");');

    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_cart_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_product_id_foreign";');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
