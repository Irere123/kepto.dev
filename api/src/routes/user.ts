import { db, eq, user } from "@kepto/db";
import { Router } from "express";

const router = Router();

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userOne = await db.select().from(user).where(eq(user.id, userId));

  return res.json({
    user: userOne[0],
  });
});

export default router;
