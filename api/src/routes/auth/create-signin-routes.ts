import { Request, Response } from "express";
import passport from "passport";
import { URL } from "url";

import { webUrl } from "@kepto/shared";

type Strategy = "twitter" | "facebook" | "github" | "google";
type Req = Request & {
  session: { redirectUrl: string | undefined };
  authInfo: { message: string };
};

export const createSigninRoutes = (
  strategy: Strategy,
  strategyOptions?: Object
) => {
  return {
    main: (req: Req, ...rest: any) => {
      let url = webUrl;

      if (typeof req.query.r === "string") {
        url = req.query.r;
      }

      // Attach the redirectURL and authType to the session so we have it in the /auth/github/callback route
      req.session.redirectUrl = url;

      return passport.authenticate(strategy, strategyOptions as any)(
        req,
        ...rest
      );
    },
    callbacks: [
      passport.authenticate(strategy, { failureRedirect: "/" }),
      (req: Req, res: Response) => {
        const redirectUrl = req.session.redirectUrl
          ? new URL(req.session.redirectUrl)
          : new URL(webUrl);
        redirectUrl.searchParams.append("authed", "true ");

        if (req.authInfo && req.authInfo.message) {
          redirectUrl.searchParams.append("toastMessage", req.authInfo.message);
        }

        redirectUrl.searchParams.append("toastType", "error");

        req.session.redirectUrl = undefined;
        res.cookie("_now_no_cache", "1", {
          maxAge: 315569260000, // 10 years
          sameSite: "lax",
          secure: false,
        });

        res.redirect(redirectUrl.href);
      },
    ],
  };
};
