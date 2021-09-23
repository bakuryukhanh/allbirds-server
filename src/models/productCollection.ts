import { Schema, model } from "mongoose";
import { ICollectionBase } from "../types/product";

const CollectionSchema = new Schema<ICollectionBase>({
  name: {
    type: String,
    required: true,
  },
  image: String,
  slug: {
    type: String,
    unique: true,
  },
  shortDesc: String,
  categoryId: Schema.Types.ObjectId,
});

export const CollectionModel = model<ICollectionBase>(
  "productCollection",
  CollectionSchema
);
