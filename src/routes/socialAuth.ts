import { Request, Response, Router } from "express";
import {
  createSocialAccount,
  getSocialAccountInfo,
} from "../models/services/socialAuth";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/bcrypt";

const SocialAuthRoute = Router();

SocialAuthRoute.route("/").post(async (req: Request, res: Response) => {
  const account = req.body;
  const existedAccount = await getSocialAccountInfo(account.id);
  if (existedAccount) {
    const token = jwt.sign(existedAccount.toObject(), JWT_SECRET);
    console.log({ isAuth: true, user: existedAccount, token: token });
    return res.json({ isAuth: true, user: existedAccount, token: token });
  } else {
    const newAccount = await createSocialAccount(account);
    const token = jwt.sign(newAccount.toObject(), JWT_SECRET);
    console.log({ isAuth: true, user: newAccount, token: token });
    return res.json({ isAuth: true, user: newAccount, token: token });
  }
});

export default SocialAuthRoute;
