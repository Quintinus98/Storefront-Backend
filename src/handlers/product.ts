import {Request, Response} from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

export const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await store.show(id);
    res.json(product);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  };

  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const update = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price
  };
  
  const id = req.params.id;
  
  try {
    const updatedProduct = await store.update(product, id);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const product = await store.delete(id);
  res.json(product);
};