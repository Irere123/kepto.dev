import { Router } from "express";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";
import { baseUrl } from "../lib/constants";

const router = Router();

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${baseUrl}/auth/github/callback`,
    },
    (accessToken, refreshToken, profile, done) => {}
  )
);

router.get("/github", () => {
  console.log("Hello world");
});

export default router;
