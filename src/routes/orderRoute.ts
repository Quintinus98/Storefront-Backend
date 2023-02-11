import express, { Router } from "express";
import {
  index,
  show,
  create,
  destroy,
  addProduct
} from "../handlers/order";

const router: Router = express.Router();


router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.post("/:id/products", addProduct)
router.delete("/:id", destroy);

export default router;