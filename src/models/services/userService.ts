import { UserModel } from "../user";
import { IUserBase } from "./../../types/user";
import bcrypt from "bcryptjs";

export const createNewUser = async (user: IUserBase) => {
  const newUser = new UserModel(user);
  await newUser.save();
  return;
};

export const authUser = async (username: string, password: string) => {
  const user = await UserModel.findOne({
    username: username,
  });
  if (!user) {
    return null;
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    return user;
  }
  return null;
};
