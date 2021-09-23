import express, { Request } from "express";
import { Response } from "express-serve-static-core";
import { authUser, createNewUser } from "../models/services/userService";
import { IUserBase } from "../types/user";
import bcrypt from "bcryptjs";
import { JWT_SECRET, saltLength } from "../config/bcrypt";
import jwt from "jsonwebtoken";

const Router = express.Router();

Router.route("/sign-up").post(async (req: Request, res: Response) => {
  try {
    const userInfo = req.body as IUserBase;
    const hashPassword = await bcrypt.hash(userInfo.password, saltLength);
    await createNewUser({ ...userInfo, password: hashPassword });
    return res.json({ success: true });
  } catch (error) {
    if (error) {
      res.status(400);
      return res.json({ sucesss: false });
    }
  }
});

Router.route("/sign-in").post(async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await authUser(username, password);
    if (user) {
      const token = jwt.sign(user.toObject(), JWT_SECRET);
      return res.json({ isAuth: true, token: token, user: user });
    } else {
      return res.json({ isAuth: false });
    }
  } catch (error) {
    res.status(400);
    return res.json({ isAuth: false, error: error });
  }
});

export const UserRoute = Router;
