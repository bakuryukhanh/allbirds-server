import { Types, ObjectId } from "mongoose";

export const string2ObjectId = (str: string): Types.ObjectId => {
  return new Types.ObjectId(str);
};
