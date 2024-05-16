export default{
    dbName: process.env.DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:process.env.DB_HOST??'localhost',
    port:process.env.DB_PORT?Number(process.env.DB_PORT):5432,
} as const

export const sessionDBConfig={
    database: process.env.DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:process.env.DB_HOST??'localhost',
    port:process.env.DB_PORT?Number(process.env.DB_PORT):5432,
} as const