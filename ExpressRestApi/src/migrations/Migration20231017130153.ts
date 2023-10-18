import { Migration } from '@mikro-orm/migrations';

export class Migration20231017130153 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cart_item" add column "purchase_price" int null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_item" drop column "purchase_price";');
  }

}
