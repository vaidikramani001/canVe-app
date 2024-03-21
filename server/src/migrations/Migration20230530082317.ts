import { Migration } from '@mikro-orm/migrations';

export class Migration20230530082317 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `asset` (`id` int unsigned not null auto_increment primary key, `url` text null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `category` (`id` int unsigned not null auto_increment primary key, `title` text not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `category` add unique `category_title_unique`(`title`);');

    this.addSql('create table `event` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` text not null, `event_start_date` datetime null, `event_end_date` datetime null, `cover_id` int unsigned null, `is_running` tinyint(1) not null default false, `is_upcoming` tinyint(1) not null default true, `is_completed` tinyint(1) not null default false, `parent_event_id` int unsigned null, `is_recent` tinyint(1) not null default false) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `event` add unique `event_cover_id_unique`(`cover_id`);');
    this.addSql('alter table `event` add index `event_parent_event_id_index`(`parent_event_id`);');

    this.addSql('create table `event_categories` (`event_id` int unsigned not null, `category_id` int unsigned not null, primary key (`event_id`, `category_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `event_categories` add index `event_categories_event_id_index`(`event_id`);');
    this.addSql('alter table `event_categories` add index `event_categories_category_id_index`(`category_id`);');

    this.addSql('create table `frame` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `asset_id` int unsigned null, `is_free` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `frame` add unique `frame_asset_id_unique`(`asset_id`);');

    this.addSql('create table `language` (`id` int unsigned not null auto_increment primary key, `title` text not null, `language_code` text not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `language` add unique `language_title_unique`(`title`);');
    this.addSql('alter table `language` add unique `language_language_code_unique`(`language_code`);');

    this.addSql('create table `page` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` text not null, `body` text not null, `slug` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `page` add unique `page_slug_unique`(`slug`);');

    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` text not null, `background_options` text null, `asset_id` int unsigned null, `event_id` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `post` add unique `post_asset_id_unique`(`asset_id`);');
    this.addSql('alter table `post` add index `post_event_id_index`(`event_id`);');

    this.addSql('create table `post_languages` (`post_id` int unsigned not null, `language_id` int unsigned not null, primary key (`post_id`, `language_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `post_languages` add index `post_languages_post_id_index`(`post_id`);');
    this.addSql('alter table `post_languages` add index `post_languages_language_id_index`(`language_id`);');

    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `username` text not null, `password` text not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_username_unique`(`username`);');

    this.addSql('alter table `event` add constraint `event_cover_id_foreign` foreign key (`cover_id`) references `asset` (`id`) on delete cascade;');
    this.addSql('alter table `event` add constraint `event_parent_event_id_foreign` foreign key (`parent_event_id`) references `event` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `event_categories` add constraint `event_categories_event_id_foreign` foreign key (`event_id`) references `event` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `event_categories` add constraint `event_categories_category_id_foreign` foreign key (`category_id`) references `category` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `frame` add constraint `frame_asset_id_foreign` foreign key (`asset_id`) references `asset` (`id`) on delete cascade;');

    this.addSql('alter table `post` add constraint `post_asset_id_foreign` foreign key (`asset_id`) references `asset` (`id`) on delete cascade;');
    this.addSql('alter table `post` add constraint `post_event_id_foreign` foreign key (`event_id`) references `event` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `post_languages` add constraint `post_languages_post_id_foreign` foreign key (`post_id`) references `post` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `post_languages` add constraint `post_languages_language_id_foreign` foreign key (`language_id`) references `language` (`id`) on update cascade on delete cascade;');

    this.addSql('drop table if exists `user_sessions`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `event` drop foreign key `event_cover_id_foreign`;');

    this.addSql('alter table `frame` drop foreign key `frame_asset_id_foreign`;');

    this.addSql('alter table `post` drop foreign key `post_asset_id_foreign`;');

    this.addSql('alter table `event_categories` drop foreign key `event_categories_category_id_foreign`;');

    this.addSql('alter table `event` drop foreign key `event_parent_event_id_foreign`;');

    this.addSql('alter table `event_categories` drop foreign key `event_categories_event_id_foreign`;');

    this.addSql('alter table `post` drop foreign key `post_event_id_foreign`;');

    this.addSql('alter table `post_languages` drop foreign key `post_languages_language_id_foreign`;');

    this.addSql('alter table `post_languages` drop foreign key `post_languages_post_id_foreign`;');

    this.addSql('create table `user_sessions` (`session_id` varchar(128) not null, `expires` int unsigned not null, `data` mediumtext null default \'NULL\', primary key (`session_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('drop table if exists `asset`;');

    this.addSql('drop table if exists `category`;');

    this.addSql('drop table if exists `event`;');

    this.addSql('drop table if exists `event_categories`;');

    this.addSql('drop table if exists `frame`;');

    this.addSql('drop table if exists `language`;');

    this.addSql('drop table if exists `page`;');

    this.addSql('drop table if exists `post`;');

    this.addSql('drop table if exists `post_languages`;');

    this.addSql('drop table if exists `user`;');
  }

}
