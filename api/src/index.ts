import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { GraphQLError } from "graphql";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Strategy as GithubStrategy } from "passport-github";
import { schema } from "./schema";
import { baseUrl, webUrl } from "./lib/constants";
import { db, eq, user as users } from "@kepto/db";
import { GithubProfile } from "./lib/types";
import user from "./routes/user";

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(passport.initialize());
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      saveUninitialized: false,
      resave: false,
    })
  );

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: `${baseUrl}/auth/github/callback`,
        scope: "user,email",
      },
      async (accessToken, _refreshToken, userProfile, done) => {
        const profile = userProfile as unknown as GithubProfile;

        let user = await db
          .select()
          .from(users)
          .where(eq(users.githubId, profile.id))
          .limit(1);
        if (!user[0]) {
          user = await db
            .insert(users)
            .values({
              avatarUrl: profile._json.avatar_url,
              displayName: profile.displayName,
              githubAccessToken: accessToken,
              email: profile._json.email,
              location: profile._json.location,
              username: profile.username!,
              bio: profile._json.bio,
            })
            .returning();
        }
        done(null, user);
      }
    )
  );

  const server = new ApolloServer({ schema, introspection: true });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers["authorization"]!.split(" ")[1] || "";
        const { userId } = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload;

        const user = (
          await db.select().from(users).where(eq(users.id, userId))
        ).at(0);

        // optionally block the user
        // we could also check user roles/permissions here
        if (!user)
          // throwing a `GraphQLError` here allows us to specify an HTTP status code,
          // standard `Error`s will have a 500 status code by default
          throw new GraphQLError("User is not authenticated", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });

        // add the user to the context
        return { user };
      },
    })
  );

  app.get(
    "/auth/github",
    passport.authenticate("github", { session: false, scope: ["user:email"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/", session: false }),
    (req: any, res) => {
      const token = jwt.sign(
        { userId: req.user[0].id },
        process.env.ACCESS_TOKEN_SECRET!
      );
      res.redirect(`${webUrl}/?token=${token}`);
    }
  );

  app.use("/user", user);

  // start the Express server
  app.listen(4000 || process.env.PORT, () => {
    console.log(`Server is running on port`);
  });
};

main();
