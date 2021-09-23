import { Schema, model } from "mongoose";
import { IProductBase } from "../types/product";

const ProductSchema = new Schema<IProductBase>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: Number,
  shortDesc: String,
  bannerImage: String,
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "productCollection",
  },
});

export const ProductModel = model<IProductBase>("product", ProductSchema);
