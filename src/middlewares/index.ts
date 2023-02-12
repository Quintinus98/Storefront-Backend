import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

declare let process: {
    env: {
      [key: string]: string;
    }
  };

// Common function - can verify both weapons and users.
export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader?.split(" ")[1] as unknown) as string;
    jwt.verify(token, process.env.TOKEN_SECRET);
  
    next();
  } catch (error) {
    res.status(401).json(`Invalid token ${error}`);
    return;
  }
};
  
export const verifyAuthUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader?.split(" ")[1] as unknown) as string;
    const decoded: jwt.JwtPayload = (jwt.verify(token, process.env.TOKEN_SECRET) as unknown) as jwt.JwtPayload;

    res.locals.user_id = decoded.user.id;
    next();
  } catch (error) {
    res.status(401).json(`Cannot verify user, ${error}`);
    return;
  }
};
  