import express, { Router } from "express";
import {
  index,
  show,
  create,
  destroy,
  authenticate,
  update
} from "../handlers/user";
import { verifyAuthUser, verifyAuthToken } from "../middlewares";

const router: Router = express.Router();


router.get("/", verifyAuthToken, index);
router.get("/:id", verifyAuthToken, show);
router.post("/", create);
router.post("/auth", authenticate);
router.put("/:id", verifyAuthUser, update);
router.delete("/:id", verifyAuthUser, destroy);

export default router;