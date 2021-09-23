import { Schema } from "mongoose";

export interface id {
  _id: Schema.Types.ObjectId;
}

export interface IProductBase {
  name: string;
  slug: string;
  price: number;
  shortDesc: string;
  collectionId: Schema.Types.ObjectId;
  bannerImage: string;
}

export interface IProduct extends IProductBase {
  category: ICategoryBase;
  collection: ICollectionBase;
  colors: IColor;
}

export interface IColorBase {
  name: string;
  background: string;
  images: string[];
  productId: Schema.Types.ObjectId;
}

export interface IColor extends IColorBase {
  sizes: ISize[];
}

export interface ISize {
  name: string;
  stock: number;
  colorId: Schema.Types.ObjectId;
}

export interface ICollectionBase {
  name: string;
  image: string;
  slug: string;
  shortDesc: string;
  categoryId: Schema.Types.ObjectId;
}

export interface ICollection extends ICollectionBase {
  products: IProduct[];
}

export interface ICategoryBase {
  name: string;
  gender: "men" | "women";
  slug: string;
}
