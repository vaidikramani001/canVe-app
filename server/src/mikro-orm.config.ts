import { MikroORM } from "@mikro-orm/mysql";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from 'path'
import { User } from "./entities/User";
import databaseConfig from "./database.config";
import { Asset } from "./entities/Asset";
import { Category } from "./entities/Category";
import { Event } from "./entities/Event";
import { Page } from "./entities/Page";
import { Frame } from "./entities/Frame";
export default {
    migrations:{
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    },
    entities: [Post, User, Asset, Category, Event, Page, Frame],
    type: 'mysql',
    debug: !__prod__,
    allowGlobalContext: true,
    introspection : __prod__,
    ...databaseConfig
} as Parameters<typeof MikroORM.init>[0] 