import { IUserBase } from "./../types/user";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<IUserBase>({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
});

export const UserModel = model<IUserBase>("user", UserSchema);
