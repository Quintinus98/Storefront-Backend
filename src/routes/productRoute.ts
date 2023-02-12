import express, { Router } from "express";
import {
  index,
  show,
  create,
  update,
  destroy,
} from "../handlers/product";
import { verifyAuthToken } from "../middlewares";

const router: Router = express.Router();


router.get("/", index);
router.get("/:id", show);
router.post("/", verifyAuthToken, create);
router.put("/:id", verifyAuthToken, update);
router.delete("/:id", verifyAuthToken, destroy);

export default router;