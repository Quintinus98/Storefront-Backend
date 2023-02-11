import express, { Router } from "express";
import {
  index,
  show,
  create,
  update,
  destroy,
} from "../handlers/product";

const router: Router = express.Router();


router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;