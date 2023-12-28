import { Router, Request, json } from "express";

import { webUrl } from "@kepto/shared";

const middlewares = Router();
const ONE_WEEK = 604800000;

// Cross origin request support
import cors from "cors";

middlewares.use(cors({ credentials: true, origin: "*" }));
middlewares.options(
  "*",
  cors({
    credentials: true,
    origin: webUrl,
  })
);

import cookieParser from "cookie-parser";
middlewares.use(cookieParser());

if (!process.env.SESSION_SECRET && !process.env.TEST_DB) {
  throw new Error(
    "[middlewares/session] You have to provide the SESSION_SECRET environment variable."
  );
}

import session from "express-session";
middlewares.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: ONE_WEEK,
      signed: process.env.TEST_DB ? false : true,
      sameSite: "lax",
    },
  })
);

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

// const isSerializedJSON = (str: string) => str[0] === "{";

// middlewares.use((req: any, res, next) => {
//   if (
//     req.session &&
//     req.session.passport &&
//     typeof req.session.passport.user === "string" &&
//     !isSerializedJSON(req.session.passport.user[0]) &&
//     req.user
//   ) {
//     req.login(req.user, () => {
//       next();
//     });
//     return;
//   }

//   next();
// });

export default middlewares;
