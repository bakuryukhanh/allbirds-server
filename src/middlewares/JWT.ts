import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/bcrypt";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401);
    return res.json({ auth: false, message: "failed to authenticate" });
  }
  jwt.verify(token as string, JWT_SECRET, (error, decode) => {
    if (error) {
      res.json({ auth: false, message: "failed to authenticate" });
    } else {
      //@ts-ignore
      req.userId = decode!.id;
    }
  });
};
