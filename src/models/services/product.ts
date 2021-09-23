import { Types } from "mongoose";
import { ProductModel } from "./../product";
import {
  IColorBase,
  id,
  IProduct,
  IProductBase,
  ISize,
} from "../../types/product";

const joinTable = [
  {
    $lookup: {
      from: "productcollections",
      localField: "collectionId",
      foreignField: "_id",
      as: "collection",
    },
  },
  {
    $lookup: {
      from: "productcategories",
      localField: "collection.category",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $lookup: {
      from: "productcolors",
      localField: "_id",
      foreignField: "productId",
      as: "colors",
    },
  },
  {
    $lookup: {
      from: "productsizes",
      localField: "colors._id",
      foreignField: "colorId",
      as: "sizes",
    },
  },
  {
    $unwind: "$collection",
  },
  { $unwind: "$category" },
  {
    $project: {
      collectionId: 0,
      "colors.productId": 0,
    },
  },
] as any;

const formatResult = (data: any[]): (IProduct & id)[] => {
  const result = data.map((data) => {
    const colors = data.colors.map((color: IColorBase & id) => {
      const sizes = data.sizes.filter((size: ISize) => {
        return size.colorId.toString() == color._id.toString();
      });
      return { ...color, sizes: sizes };
    });
    return { ...data, colors: colors };
  });
  return result.map((product) => {
    const { sizes, ...other } = product;
    return other;
  });
};

export const getProducts = async (): Promise<IProductBase[]> => {
  const products = await ProductModel.find().lean();
  return products;
};

export const getProductFromId = async (id: Types.ObjectId) => {
  const product = await ProductModel.aggregate(
    [
      {
        $match: {
          _id: id,
        },
      },
    ].concat(...joinTable)
  );
  return formatResult(product)[0];
};

export const getProductsFromSlug = async (slug: string) => {
  const products = await ProductModel.aggregate(
    [
      {
        $match: {
          slug: slug,
        },
      },
    ].concat(...joinTable)
  ).catch((error) => console.log(error));
  if (typeof products == "undefined") {
    return [];
  }
  return formatResult(products);
};

export const addProduct = async (product: IProductBase): Promise<void> => {
  const newProduct = new ProductModel(product);
  await newProduct.save();
  return;
};
