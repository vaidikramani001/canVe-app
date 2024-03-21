// commands/populate_default.ts

import { Post } from '../src/entities/Post';
import { Language } from '../src/entities/Language';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../src/mikro-orm.config';

export async function populate_default_language_to_posts(): Promise<void> {
    const orm = await MikroORM.init(mikroOrmConfig)
    const em = orm.em
  // Extract the desired default language from the command line arguments
  const defaultLanguage = 'eng';
  // Fetch all posts from the database
  const posts = await em.find(Post, {});

  // Loop through each post and set the default language
  const language = await em.findOne(Language, { languageCode: defaultLanguage });
  for (const post of posts) {
    if (language) {
      const found_posts = await post.languages.matching({ having: { languageCode: language.languageCode } })
      
      if(!found_posts || !(found_posts.length>0))
      post.languages.add(language);
      em.persist(post)
    }
  }

  // Persist the changes to the database
  await em.flush();

  console.log(`Default language set to "${defaultLanguage}" for all posts`);

}