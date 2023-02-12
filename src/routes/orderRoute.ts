import express, { Router } from "express";
import { 
  index,
  show,
  create,
  completeOrder,
  destroy
} from "../handlers/order";
import { completedOrders } from "../handlers/dashboard";

const router: Router = express.Router();


router.get("/", index);
router.get("/completed", completedOrders);
router.get("/:id", show);
router.post("/", create);
router.post("/:id", completeOrder);
router.delete("/:id", destroy);

export default router;