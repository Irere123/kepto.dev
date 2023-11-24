import { and, connections, db, eq, sql, user } from "@kepto/db";

const deleteConn = async (userId: string, connecteeId: string) => {
  const deletedRow = await db
    .delete(connections)
    .where(
      and(
        eq(connections.connectorId, userId),
        eq(connections.connecteeId, connecteeId)
      )
    )
    .returning();

  if (deletedRow) {
    await db
      .update(user)
      .set({ numConnections: sql`${user.numConnections} - 1` })
      .where(eq(user.id, userId));
  }
};

export const connect = async (
  userId: string,
  connecteeId: string,
  should_connect: boolean
) => {
  if (should_connect) {
    const conn = await db
      .select()
      .from(connections)
      .where(eq(connections.connecteeId, connecteeId));

    if (conn[0]) {
      return;
    }

    if (userId != connecteeId) {
      await db.transaction(async (tx) => {
        await tx
          .insert(connections)
          .values({ connecteeId, connectorId: userId });

        await tx
          .update(user)
          .set({ numConnections: sql`${user.numConnections} + 1` })
          .where(eq(user.id, userId));
      });
    }
  } else {
    await deleteConn(userId, connecteeId);
  }
};
