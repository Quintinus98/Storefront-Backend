import { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";


const dashboard = new DashboardQueries();

export const completedOrders = async (_req: Request, res: Response) => {
  try {
    const user_id: string = res.locals.user_id;
    const status = "complete";
    const orders = await dashboard.completedOrders(user_id, status);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};