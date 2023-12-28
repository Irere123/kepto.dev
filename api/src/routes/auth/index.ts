import { Router } from "express";
import githubAuthRouter from "./github";
import logoutRouter from "./logout";

const authRouter = Router();

authRouter.use("/github", githubAuthRouter);
authRouter.use("/logout", logoutRouter);

export default authRouter;
