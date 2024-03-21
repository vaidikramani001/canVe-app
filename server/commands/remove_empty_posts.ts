import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../src/mikro-orm.config";
import { Post } from "../src/entities/Post";

export const remove_empty_posts = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em;
  // Fetch all posts from the database
  const posts = await em.find(Post, {});
  for (const post of posts) {
    /** Check and remove the post with empty asset */
    if(!post.asset){
      await em.removeAndFlush(post)
    }
  }
};
