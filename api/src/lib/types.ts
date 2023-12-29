import { Profile } from "passport-github";
import { User } from "@kepto/db";
import { Response } from "express";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}

export type GQLContext = {
  user: User;
  res: Response;
};
