import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";

import { apiUrl } from "@kepto/shared";
import { db, eq, user as userDB } from "@kepto/db";
import { GithubProfile } from "./lib/types";

const isSerializedJSON = (str: string) =>
  str[0] === "{" && str[str.length - 1] === "}";

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, typeof user === "string" ? user : JSON.stringify(user));
  });

  // `data` is the full user data
  // to avoid having to go to the db on every single request.
  passport.deserializeUser((data: string, done) => {
    if (isSerializedJSON(data)) {
      let user;

      // Ignore errors if our isSerializedJSON heuristic is wrong and `data` isn't serialized JSON
      try {
        user = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }

      if (user && user.id && user.createdAt) {
        return done(null, user);
      }
    }
  });

  // Set up github login

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: `${apiUrl}/auth/github/callback`,
        scope: ["user"],
        passReqToCallback: true,
      },
      async (
        req: any,
        accessToken: any,
        _refreshToken: any,
        userProfile: any,
        done: any
      ) => {
        const profile = userProfile as unknown as GithubProfile;

        let user = await db
          .select()
          .from(userDB)
          .where(eq(userDB.githubId, profile.id));

        if (!user[0]) {
          user = await db
            .insert(userDB)
            .values({
              avatarUrl: profile._json.avatar_url,
              displayName: profile.displayName,
              githubAccessToken: accessToken,
              githubId: profile.id,
              email: profile._json.email,
              location: profile._json.location,
              username: profile.username!,
              bio: profile._json.bio,
            })
            .returning();
        }
        done(null, user[0]);
        return user[0];
      }
    )
  );
};

export { init };
