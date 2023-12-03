import { and, connections, db, eq, or, sql, user } from "@kepto/db";

const deleteConn = async (userId: string, connectorId: string) => {
  const deletedRow = await db
    .delete(connections)
    .where(
      and(
        eq(connections.connectorId, connectorId),
        eq(connections.userId, userId)
      )
    )
    .returning();

  if (deletedRow) {
    await db
      .update(user)
      .set({ numConnections: sql`${user.numConnections} - 1` })
      .where(eq(user.id, connectorId));
  }
};

export const connect = async (
  userId: string,
  connectorId: string,
  should_connect: boolean
) => {
  if (should_connect) {
    const conn = await db
      .select()
      .from(connections)
      .where(
        or(
          eq(connections.connectorId, connectorId),
          eq(connections.userId, userId)
        )
      );

    if (conn[0]) {
      return;
    }

    if (connectorId != userId) {
      await db.transaction(async (tx) => {
        await tx.insert(connections).values({ connectorId, userId });

        await tx
          .update(user)
          .set({ numConnections: sql`${user.numConnections} + 1` })
          .where(eq(user.id, userId));
      });
    }
  } else {
    await deleteConn(userId, connectorId);
  }
};
