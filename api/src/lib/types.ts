import { User } from "@kepto/db";
import { Profile } from "passport-github";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}

export type GQLContext = {
  user: User;
};
