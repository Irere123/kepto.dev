import { Router } from "express";
import { db, users } from "@kepto/db";

const router = Router();

router.get("/test-user", async (_req, res) => {
  const us = await db.select().from(users);

  res.send({ users: us });
});

export default router;
