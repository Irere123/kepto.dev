import { Profile } from "passport-github";
import { User } from "@kepto/db";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}

export type GQLContext = {
  user: User;
};
