import { Profile } from "passport-github";
import { User } from "@kepto/shared";
import { Request, Response } from "express";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}

type Req = Request & { session: { lastRequest: string; user: User } };

export type GQLContext = {
  user: User;
  res: Response;
  req: Req;
};
