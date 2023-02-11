import { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";


const dashboard = new DashboardQueries();

export const productinOrders = async (_req: Request, res: Response) => {
    try {
        const productinOrders = await dashboard.productsInOrders();
        res.json(productinOrders)
    } catch (error) {
        res.status(400).json(`Failed to fetch products in order.`)
    }
}
export const usersWithOrders = async (_req: Request, res: Response) => {
    try {
        const usersWithOrders = await dashboard.usersWithOrders();
        res.status(200).json(usersWithOrders)
    } catch (error) {
        res.status(400).json(`Failed to fetch users with order.`)
    }
}