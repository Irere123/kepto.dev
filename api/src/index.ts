import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Strategy as GithubStrategy } from "passport-github";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { schema } from "./schema";
import { baseUrl, webUrl } from "./lib/constants";
import { db, eq, user as users } from "@kepto/db";
import { GithubProfile } from "./lib/types";
import { pubsub } from "./pubsub";
import user from "./routes/user";
import dev from "./routes/dev";

const main = async () => {
  const app = express();

  const httpServer = createServer(app);

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

        let user: any = await db.query.user.findFirst({
          where: eq(users.githubId, profile.id),
        });

        if (!user) {
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

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,
      context: (data) => {
        console.log(data);
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

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

        if (!userId) {
          return { user: null };
        }

        const user = (
          await db.select().from(users).where(eq(users.id, userId))
        ).at(0);

        // add the user to the context
        return { user, pubsub };
      },
    })
  );

  app.get(
    "/auth/github",
    passport.authenticate("github", { session: false, scope: ["user:email"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/failed",
      session: false,
    }),
    (req: any, res) => {
      const token = jwt.sign(
        { userId: req.user[0].id },
        process.env.ACCESS_TOKEN_SECRET!
      );
      res.redirect(`${webUrl}/?token=${token}`);
    }
  );

  app.use("/user", user);
  app.use("/dev", dev);

  // start the Express server
  httpServer.listen(4000 || process.env.PORT, () => {
    console.log(`Server is running on port`);
  });
};

main();
