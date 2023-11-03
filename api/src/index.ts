import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import passport from "passport";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema";
import dev from "./routes/dev";
import auth from "./routes/dev";

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());

  const server = new ApolloServer({ schema });

  await server.start();

  app.use("/graphql", cors(), json(), expressMiddleware(server));
  app.use("/auth", auth);
  app.use("/dev", dev);

  // start the Express server
  app.listen(4000 || process.env.PORT, () => {
    console.log(`Server is running on port`);
  });
};

main();
