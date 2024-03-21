import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../src/mikro-orm.config";
import { Language } from "../src/entities/Language";
import { Post } from "../src/entities/Post";
import { Asset } from "../src/entities/Asset";

export const sync_images_to_prod = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em;
  // Fetch all posts from the database
  const assets = await em.find(Asset, {});
  for (const asset of assets) {
    if (asset.url?.startsWith("http://localhost:4000")) {
      asset.url = asset.url.replace(
        "http://localhost:4000",
        "https://api-post-maker.devserapp.com"
      );
      em.persist(asset);
    }
  }

  await em.flush();
};
