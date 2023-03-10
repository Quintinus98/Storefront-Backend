import { Request, Response } from "express";
import { OrderStore, Order, orderProducts } from "../models/order";


const store = new OrderStore();

export const index = async (_req: Request, res: Response) => {
  try {
    const user_id: string = res.locals.user_id;
    const orders = await store.index(user_id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user_id: string = res.locals.user_id;
    const order = await store.show(id, user_id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  const myOrder: Order = {
    user_id: res.locals.user_id,
    status: "active"
  };
  try {
    const newOrder = await store.create(myOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const completeOrder = async (req: Request, res: Response) => {
  const status = "complete";
  const id = parseInt(req.params.id);
  const user_id = res.locals.user_id;
  try {
    const updateOrder = await store.completeOrder(status, id, user_id);
    res.status(201).json(updateOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const orderProduct: orderProducts = {
    quantity: parseInt(req.body.quantity),
    order_id: parseInt(req.params.id),
    product_id: parseInt(req.body.product_id)
  };
  const user_id: string = res.locals.user_id;

  try {
    const addedProduct = await store.addProduct(orderProduct, user_id);
    res.json(addedProduct);
  } catch (error) {
    res.status(400).json(`Failed to add product: ${error}`);
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user_id = res.locals.user_id;
  try {
    const order = await store.delete(id, user_id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};