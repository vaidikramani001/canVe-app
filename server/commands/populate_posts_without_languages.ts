import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../src/mikro-orm.config";
import { Language } from "../src/entities/Language";
import { Post } from "../src/entities/Post";

export const populate_posts_without_languages = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em;
  // Fetch all posts from the database
  const posts = await em.find(Post, {});

  // Loop through each post and set the default language
  const languages = await em.find(Language, {});
  for (const post of posts) {
    await post.languages.init()
    if(!(post.languages.getItems()?.length>0)){
      post.languages.add(languages)
      em.persist(post)
    }
  }
  
  await em.flush();
};
