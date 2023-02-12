import {Request, Response} from "express";
import { user, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

declare let process: {
  env: {
    [key: string]: string;
  }
};

type authUser = {
  firstname: string,
  password: string
}

const store = new UserStore();

export const index = async (_req: Request, res: Response) => {
  const allUser = await store.index();
  res.json(allUser);
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const singleUser = await store.show(id);
    res.json(singleUser);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const update = async (req: Request, res: Response) => {
  const user: user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };

  const id = req.params.id;

  if (res.locals.user_id !== id) {
    res.status(404).json({"error": "User does not match"});
    return;
  }

  try {
    const updatedUser = await store.update(user, id);
    const token = jwt.sign({user: updatedUser}, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (res.locals.user_id !== id) {
    res.status(404).json({"error": "User does not match"});
    return;
  }

  const user = await store.delete(id);
  res.json(user);
};

export const authenticate =async (req: Request, res: Response) => {
  try {
    const user: authUser = {
      firstname: req.body.firstname,
      password: req.body.password,
    };
    const existingUser = await store.authenticate(user);
    if (existingUser === null) {
      res.json(existingUser);
    } else {
      const token = jwt.sign({user: existingUser}, process.env.TOKEN_SECRET);
      res.json(token);
    }
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};