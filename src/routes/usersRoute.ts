import express, { Router } from "express";
import {
  index,
  show,
  create,
  destroy,
  authenticate,
  update
} from "../handlers/user";
import { verifyAuthUser } from "../middlewares";

const router: Router = express.Router();


router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.post("/auth", authenticate);
router.put("/:id", verifyAuthUser, update);
router.delete("/:id", destroy);

export default router;