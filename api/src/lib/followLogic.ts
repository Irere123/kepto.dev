import { and, follows, db, eq, or, sql, user } from "@kepto/db";

const unfollow = async (userId: string, followerId: string) => {
  await db.transaction(async (tx) => {
    tx.delete(follows).where(
      and(eq(follows.followerId, followerId), eq(follows.userId, userId))
    );

    await tx
      .update(user)
      .set({ numFollowers: sql`${user.numFollowers} - 1` })
      .where(eq(user.id, userId));
    await tx
      .update(user)
      .set({ numFollowing: sql`${user.numFollowing} - 1` })
      .where(eq(user.id, followerId));
  });
};

export const follow = async (
  userId: string,
  followerId: string,
  should_connect: boolean
) => {
  if (should_connect) {
    const conn = await db
      .select()
      .from(follows)
      .where(
        or(eq(follows.followerId, followerId), eq(follows.userId, userId))
      );

    if (conn[0]) {
      return;
    }

    if (followerId != userId) {
      await db.transaction(async (tx) => {
        await tx.insert(follows).values({ followerId, userId });

        await tx
          .update(user)
          .set({ numFollowers: sql`${user.numFollowers} + 1` })
          .where(eq(user.id, userId));
        await tx
          .update(user)
          .set({ numFollowing: sql`${user.numFollowing} + 1` })
          .where(eq(user.id, followerId));
      });
    }
  } else {
    await unfollow(userId, followerId);
  }
};
