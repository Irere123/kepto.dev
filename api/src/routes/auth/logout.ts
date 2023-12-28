import { webUrl } from "@kepto/shared";
import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/", (req, res) => {
  return res.redirect(webUrl);
});

export default logoutRouter;
