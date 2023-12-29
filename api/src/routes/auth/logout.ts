import { webUrl } from "@kepto/shared";
import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/", (req: any, res, next) => {
  req.session.destroy((err: any) => {
    res.clearCookie("session");
    if (err) {
      console.log(err);
      next();
    }

    res.redirect(webUrl);
  });
});

export default logoutRouter;
