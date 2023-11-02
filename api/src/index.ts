import express, { json } from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema";

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({ schema });

  await server.start();

  app.use("/graphql", cors(), json(), expressMiddleware(server));

  // start the Express server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${4000}`);
  });
};

main();
