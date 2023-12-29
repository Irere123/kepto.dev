import { Router } from "express";
import { db, eq, user } from "@kepto/db";
import { faker } from "@faker-js/faker";

const router = Router();

router.get("/test-user", async (req: any, res, next) => {
  const username = req.query.username as string;
  let users = await db.select().from(user).where(eq(user.username, username));

  if (!users[0]) {
    users = await db
      .insert(user)
      .values({
        username,
        displayName: faker.internet.displayName(),
        avatarUrl: faker.image.avatar(),
        githubAccessToken: faker.string.uuid(),
        githubId: faker.string.octal(),
        bio: faker.person.bio(),
        email: faker.internet.email(),
        ip: faker.internet.ip(),
        location: faker.hacker.abbreviation(),
      })
      .returning();
  }

  res.json({ done: true });
});

export default router;
