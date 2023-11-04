import { Profile } from "passport-github";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}
