import { Router } from "express";

const router = Router();

router.get("/github", () => {
  console.log("Hello world");
});

export default router;
