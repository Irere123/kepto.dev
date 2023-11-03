import { Router } from "express";

const router = Router();

router.get("/github", (_req, res) => {
  res.send("github");
});

export default router;
