import { Router } from "express";
import { db, user } from "@kepto/db";

const router = Router();

router.get("/test-user", async (_req, res) => {
  const us = await db.select().from(user);

  res.send({ users: us });
});

export default router;
