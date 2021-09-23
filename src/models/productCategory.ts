import { Schema, model } from "mongoose";
import { ICategoryBase } from "../types/product";

const CategorySchema = new Schema<ICategoryBase>({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
});

export const CategoryModel = model<ICategoryBase>(
  "productCategory",
  CategorySchema
);
