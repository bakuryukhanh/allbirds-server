import { Schema, model } from "mongoose";
import { ISize } from "../types/product";

const SizeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 10,
  },
  colorID: {
    type: Schema.Types.ObjectId,
    ref: "productColor",
  },
});

export const SizeModel = model<ISize>("productSize", SizeSchema);
