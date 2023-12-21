import { and, connections, db, eq, or, sql, user } from "@kepto/db";

const unconnect = async (userId: string, connectorId: string) => {
  await db.transaction(async (tx) => {
    tx.delete(connections).where(
      and(
        eq(connections.connectorId, connectorId),
        eq(connections.userId, userId)
      )
    );

    await tx
      .update(user)
      .set({ numConnections: sql`${user.numConnections} - 1` })
      .where(eq(user.id, connectorId));
    await tx
      .update(user)
      .set({ numConnectors: sql`${user.numConnectors} - 1` })
      .where(eq(user.id, userId));
  });
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
      });
    }
  } else {
    await unconnect(userId, connectorId);
  }
};
