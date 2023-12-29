import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

import { Router, Request, json } from "express";

import { isProd, webUrl } from "@kepto/shared";

const middlewares = Router();

const ONE_WEEK = 604800000;

// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
});

middlewares.use(
  cors({
    origin: webUrl,
    credentials: true,
  })
);

middlewares.use(cookieParser());

if (!process.env.SESSION_SECRET && !process.env.TEST_DB) {
  throw new Error(
    "[middlewares/session] You have to provide the SESSION_SECRET environment variable."
  );
}

middlewares.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false, // recommended: only save session when data exists
    resave: false, // required: force lightweight session keep alive (touch)
    store: redisStore,
    cookie: {
      httpOnly: isProd,
      maxAge: ONE_WEEK,
      sameSite: "lax",
      secure: isProd,
    },
  })
);

middlewares.use((req: any, _res: any, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb: any) => {
      cb();
    };
  }

  if (req.session && !req.session.save) {
    req.session.save = (cb: any) => {
      cb();
    };
  }

  next();
});

middlewares.use(json());

// Passport
middlewares.use(passport.initialize());
middlewares.use(passport.session());

middlewares.use((req: Request, _res, next) => {
  if (req.session && req.user) {
    (req as any).session.lastrequest = Date.now();
  }
  next();
});

export default middlewares;
