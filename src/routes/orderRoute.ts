import express, { Router } from "express";
import { 
  index,
  show,
  create,
  completeOrder,
  addProduct,
  destroy,
} from "../handlers/order";
import { completedOrders } from "../handlers/dashboard";

const router: Router = express.Router();


router.get("/", index);
router.post("/:id", completeOrder);
router.post("/", create);
router.get("/:id", show);
router.get("/ctd", completedOrders);
router.post("/:id/products", addProduct);
router.delete("/:id", destroy);

export default router;