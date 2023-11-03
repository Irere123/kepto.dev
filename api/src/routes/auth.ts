import { Router } from "express";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";
import { baseUrl } from "../lib/constants";
import { db, eq, user } from "@kepto/db";

const router = Router();

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${baseUrl}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      let users = await db
        .select()
        .from(user)
        .where(eq(user.githubId, profile.id));

      console.log(user);
      console.log(profile);

      done();
    }
  )
);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (_req, res) => {
    res.redirect("/");
  }
);

export default router;
