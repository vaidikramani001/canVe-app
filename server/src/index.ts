require("dotenv").config();
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import {
  COOKIE_NAME,
  SESSION_MAX_AGE,
  SESSION_SECRET,
  __prod__,
} from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
// import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { sessionDBConfig } from "./database.config";
import cors from "cors";
import dayjs from "dayjs";
import * as session from "express-session";
import connectMySQL from "express-mysql-session";
import mysql from "mysql2/promise";
var customParseFormat = require("dayjs/plugin/customParseFormat");
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import path from "path";
import { DuplicateEntryError } from "./utils/Errors/DuplicateEntryError";
import { formatError } from "graphql";
import { authChecker } from "./utils/authentication/authChecker";
import { AuthResolver } from "./resolvers/auth/resolver";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { HOST } from "./constants";
import * as fs from "fs";
import { DocumentResolver } from "./resolvers/document";

dayjs.extend(customParseFormat);
const main = async () => {
  /** Initialize mikro-orm */
  // const orm = await MikroORM.init(mikroConfig);
  // await orm.getMigrator().up(); // em: orm.em,

  const app = express();

  // Configure Multer for file upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folderName = req.headers["x-folder-name"] as string;

      // Check if folderName is provided
      if (!folderName) {
        return cb(new Error("Folder name not provided in headers."), "error");
      }

      // Construct the destination path
      const destinationPath = `public/uploads/${folderName}`;

      // Create the directory if it doesn't exist
      fs.mkdir(destinationPath, { recursive: true }, function (err) {
        if (err) {
          // Handle error
          return cb(err, destinationPath); // Pass destinationPath even if error occurs
        }
        cb(null, destinationPath);
      });
    },
    filename: function (req, file, cb) {
      const fileId = uuidv4(); // Generate unique file name
      cb(null, file.originalname); // Save file with UUID as filename
    },
  });

  const upload = multer({ storage: storage });

  // Serve static files
  app.use(express.static("public"));

  // Add a new endpoint for file upload
  app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    const folderName = req.headers["x-folder-name"];

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileUrl = `${HOST}public/uploads/${folderName}/${file.originalname}`;

    // Save the file URL in your database
    res.status(200).json({ url: fileUrl });
  });

  /** Configure mySQL store for session */
  const MySQLSession = connectMySQL(session);

  const mysqlPool = mysql.createPool({
    ...sessionDBConfig,
  });
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://localhost:3010",
        "https://post-maker-app.vercel.app",
      ],
      credentials: true,
    })
  );
  /** Configure session */
  app.use(
    session.default({
      name: COOKIE_NAME,
      store: new MySQLSession(
        {
          schema: {
            tableName: "user_sessions", // Use another table-name than the default "session" one
          },
          // Insert connect-pg-simple options here
          createDatabaseTable: true,
        },
        mysqlPool
      ),
      secret: SESSION_SECRET,
      resave: false,
      cookie: {
        maxAge: SESSION_MAX_AGE, // 30 days
        httpOnly: true,
        secure: __prod__, // only works in prod
        sameSite: __prod__ ? "none" : "lax",
      },
      saveUninitialized: false,
      // Insert express-session options here
    })
  );
  /** graphqlUploadExpress middleware  */
  app.use(graphqlUploadExpress());

  /** Create apollo server */
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [
        // HelloResolver,
        UserResolver,
        AuthResolver,
        DocumentResolver
      ],
      validate: false,
      authChecker,
    }),
    introspection: true,
    context: ({ req, res }) => ({ req, res }), // prisma: orm.prisma,
    formatError: (error) => {
      if (error.originalError instanceof DuplicateEntryError) {
        return {
          message: error.message,
          code: error.extensions.code,
        };
      }
      return formatError(error);
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
    bodyParserConfig: { limit: "1tb" },
  });
  /**
   * Trust proxies and make secure false for http request
   */
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      req.session.cookie.secure = false;
    }
    next();
  });
  if (!__prod__) {
    app.use(express.static(path.join(process.cwd())));
  }
  /** Start server */
  app.listen(4000, () => {
    console.log("Server started on localhost:4000 ");
  });
};
main().catch((err) => console.error(err));
