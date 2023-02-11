import {Request, Response} from "express";
import { Order, OrderStore, orderProducts } from "../models/order";
import jwt from "jsonwebtoken";

declare let process: {
  env: {
    [key: string]: string;
  }
};


const store = new OrderStore();

export const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const order = await store.show(id);
    res.json(order);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const create = async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;

  // Return null if user is unauthoriazed.
  if (authorizationHeader === undefined) {
    return res.status(400).json(null);
  }

  const token = (authorizationHeader?.split(" ")[1] as unknown) as string;
  const decoded: jwt.JwtPayload = (jwt.verify(token, process.env.TOKEN_SECRET) as unknown) as jwt.JwtPayload;

  const order: Order = {
    status: 'active',
    user_id: decoded.user.id
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const addProduct = async (req: Request, res: Response) => {
    const orderProduct: orderProducts = {
        quantity: parseInt(req.body.quantity),
        orderId: req.params.id,
        productId: req.body.productId
    }
    console.log(req.params)
    try {
        const addedProduct = await store.addProduct(orderProduct);
        res.json(addedProduct);
    } catch (error) {
        res.status(400).json(error);
    }
}


export const destroy = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const order = await store.delete(id);
  res.json(order);
};