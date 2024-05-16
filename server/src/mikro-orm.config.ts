// import { MikroORM } from "@mikro-orm/mysql";
// import { __prod__ } from "./constants";
// import path from 'path'
// import databaseConfig from "./database.config";
// export default {
//     migrations: {
//         path: path.join(__dirname, './migrations'), // path to the folder with migrations
//         glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
//     },
//     type: 'mysql',
//     debug: !__prod__,
//     allowGlobalContext: true,
//     introspection: __prod__,
//     ...databaseConfig
// } as Parameters<typeof MikroORM.init>[0] 