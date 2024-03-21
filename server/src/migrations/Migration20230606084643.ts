import { Migration } from '@mikro-orm/migrations';

export class Migration20230606084643 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `roles` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `roles`;');
  }

}
