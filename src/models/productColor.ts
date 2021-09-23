import { Schema, model } from "mongoose";
import { IColorBase } from "../types/product";

const ColorSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  background: {
    type: String,
    default: "#000000",
  },
  images: [String],
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
});

export const ColorModel = model<IColorBase>("productColor", ColorSchema);
