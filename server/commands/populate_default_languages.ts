import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../src/mikro-orm.config";
import { Language } from "../src/entities/Language";

const lanugages = [
  {
    title: "Franch",
    languageCode: "fr",
  },
  {
    title: "Spanish",
    languageCode: "spa",
  },
  {
    title: "Gujarati",
    languageCode: "guj",
  },
  {
    title: "Hindi",
    languageCode: "hin",
  },
];

export const populate_default_languages = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em;
  const new_languages: string[] = [];
  for (const language of lanugages) {
    const lang = await em.findOne(Language, { languageCode: language.languageCode })
    if (!lang) {
      const lang = em.create(Language, {
        languageCode: language.languageCode,
        title: language.title,
      });
      em.persist(lang);
      new_languages.push(lang.languageCode);
    }
  }
  em.flush();
  console.log(`\n[INFO] Created languages : ${new_languages.join(",\s")}`);
};
