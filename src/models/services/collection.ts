import { CollectionModel } from "./../productCollection";
import { Types } from "mongoose";
import { ICollectionBase } from "../../types/product";

export const getCollections = async (): Promise<ICollectionBase[]> => {
  const collections = await CollectionModel.find().lean();
  return collections;
};

export const getCollection = async (id: Types.ObjectId) => {
  const collection = await CollectionModel.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "collectionId",
        as: "products",
      },
    },
  ]);
  return collection[0];
};

export const getCollectionsFromSlug = async (slug: string) => {
  const collection = await CollectionModel.aggregate([
    {
      $match: {
        slug: slug,
      },
    },
    {
      $lookup: {
        from: "productcategories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "collectionId",
        as: "products",
      },
    },
    {
      $unwind: "$category",
    },
  ]);
  return collection;
};
