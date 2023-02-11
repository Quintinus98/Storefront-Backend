import express, { Router, Request, Response } from "express";
import { productinOrders, usersWithOrders } from "../handlers/dashboard";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send("Welcome to the Dashboard")
})
router.get("/products_in_orders", productinOrders);
router.get("/users_with_orders", usersWithOrders)

export default router;