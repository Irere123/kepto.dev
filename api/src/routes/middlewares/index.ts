import { Router, Request, json } from "express";
import { isProd, webUrl } from "@kepto/shared";

const middlewares = Router();
const ONE_WEEK = 604800000;

// Cross origin request support
import cors from "cors";

middlewares.use(
  cors({
    origin: webUrl,
    credentials: true,
  })
);

import cookieParser from "cookie-parser";
middlewares.use(cookieParser());

if (!process.env.SESSION_SECRET && !process.env.TEST_DB) {
  throw new Error(
    "[middlewares/session] You have to provide the SESSION_SECRET environment variable."
  );
}

import session from "cookie-session";
middlewares.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET!,
    sameSite: "lax",
    secure: isProd,
    signed: true,
    maxAge: ONE_WEEK,
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
import passport from "passport";
middlewares.use(passport.initialize());
middlewares.use(passport.session());

middlewares.use((req: Request, _res, next) => {
  if (req.session && req.user) {
    (req as any).session.lastrequest = Date.now();
  }
  next();
});

export default middlewares;
