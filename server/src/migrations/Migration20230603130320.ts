import { Migration } from '@mikro-orm/migrations';

export class Migration20230603130320 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `user_sessions`;');

    this.addSql('alter table `asset` modify `url` text;');

    this.addSql('alter table `post` modify `background_options` text;');
    this.addSql('alter table `post` add unique `post_title_unique`(`title`);');
  }

  async down(): Promise<void> {
    this.addSql('create table `user_sessions` (`session_id` varchar(128) not null, `expires` int unsigned not null, `data` mediumtext null default \'NULL\', primary key (`session_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `asset` modify `url` text default \'NULL\';');

    this.addSql('alter table `post` modify `background_options` text default \'NULL\';');
    this.addSql('alter table `post` drop index `post_title_unique`;');
  }

}
