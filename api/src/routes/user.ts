import { and, connections, db, eq, user } from "@kepto/db";
import { Router } from "express";

const router = Router();

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userOne = await db.select().from(user).where(eq(user.id, userId));

  let youConnected = await db
    .select()
    .from(connections)
    .where(eq(connections.connecteeId, userId));

  return res.json({
    user: userOne[0],
    ok: true,
    youConnected: !!youConnected[0],
  });
});

export default router;
