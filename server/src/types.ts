// import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
// import { Request, Response } from "express"
// import { SessionData } from "express-session"
// import { PrismaClient } from '@prisma/client';

// export type MyContext = {
//     em : EntityManager<IDatabaseDriver<Connection>>,
//     req : Request & { session : SessionData & { userId : number}},
//     res : Response
// }
// export type Role = "ADMIN" | "USER"

// export type Permission = POST_PERMISSIONS | EVENT_PERMISSIONS | USER_PERMISSIONS
// type POST_PERMISSIONS = "post_create" | "post_read" | "post_write" | "post_delete" 
// type EVENT_PERMISSIONS = "event_create" | "event_read" | "event_write" | "event_delete"
// type USER_PERMISSIONS = "user_create" | "user_read" | "user_write" | "user_delete"

import { Request, Response } from "express";
import { SessionData } from "express-session";
import { PrismaClient } from '@prisma/client';
import { AccessTokenData } from "./services";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>;
    prisma: PrismaClient;
    req: Request & { session: SessionData & { userId: number } };
    res: Response;
    token: string;
    user: AccessTokenData | null;
};

export type Role = "ADMIN" | "USER";

export type Permission = POST_PERMISSIONS | EVENT_PERMISSIONS | USER_PERMISSIONS;
type POST_PERMISSIONS = "post_create" | "post_read" | "post_write" | "post_delete";
type EVENT_PERMISSIONS = "event_create" | "event_read" | "event_write" | "event_delete";
type USER_PERMISSIONS = "user_create" | "user_read" | "user_write" | "user_delete";
