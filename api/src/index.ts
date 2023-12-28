import "dotenv/config";
import express, { json, Request, Response } from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { schema } from "./schema";
import user from "./routes/user";
import dev from "./routes/dev";
import { init as initPassport } from "./authentication";
import authRoutes from "./routes/auth";
import middlewares from "./routes/middlewares";

const main = async () => {
  initPassport();

  const app = express();

  // Trust the now proxy
  app.set("trust proxy", true);

  // All other middlewares
  app.use(middlewares);

  app.use("/user", user);
  app.use("/dev", dev);
  app.use("/auth", authRoutes);

  const httpServer = createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,
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
        let currentUser = req.user ? req.user : null;

        return {
          user: currentUser,
        };
      },
    })
  );

  //   context: async ({ req }) => {
  //     const token = req.headers["authorization"]!.split(" ")[1] || "";
  //     let userId;

  //     try {
  //       const jwtToken = jwt.verify(
  //         token,
  //         process.env.ACCESS_TOKEN_SECRET!
  //       ) as JwtPayload;
  //       userId = jwtToken.userId;
  //     } catch (error) {}

  //     const user = await db.select().from(users).where(eq(users.id, userId));
  //     // add the user to the context
  //     return { user: user[0] };
  //   },
  // })

  // app.get(
  //   "/auth/github",
  //   passport.authenticate("github", { session: false, scope: ["user:email"] })
  // );

  // app.get(
  //   "/auth/github/callback",
  //   passport.authenticate("github", {
  //     failureRedirect: "/failed",
  //     session: false,
  //   }),
  //   (req: any, res) => {
  //     const token = jwt.sign(
  //       { userId: req.user[0].id },
  //       process.env.ACCESS_TOKEN_SECRET!
  //     );
  //     res.redirect(`${webUrl}/auth/login?token=${token}`);
  //   }
  // );

  // Redirect a request to the root path to the main app
  app.use("/", (_req: Request, res: Response) => {
    res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://kepto.vercel.app"
        : "http://localhost:3000"
    );
  });

  // start the Express server
  httpServer.listen(4000 || process.env.PORT, () => {
    console.log(`Server is running on port`);
  });
};

main();
