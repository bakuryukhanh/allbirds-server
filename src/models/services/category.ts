import { CollectionModel } from "./../productCollection";
import { CategoryModel } from "./../productCategory";
import { ObjectId, Schema, Types } from "mongoose";
import { ICategoryBase, ICollectionBase } from "../../types/product";

export const getCategories = async (): Promise<ICategoryBase[]> => {
  const categories = await CategoryModel.find().lean();
  return categories;
};

export const getCategoriesFromSlug = async (slug: string) => {
  const categories = await CategoryModel.aggregate([
    {
      $match: {
        slug: slug,
      },
    },
    {
      $lookup: {
        from: "productcollections",
        localField: "_id",
        foreignField: "category",
        as: "collections",
      },
    },
  ]);
  console.log(categories);
  return categories;
};

export const getCategory = async (id: Schema.Types.ObjectId) => {
  const category = await CategoryModel.findById(id).lean();
  return category;
};

export const getCollectionsOfCategory = async (
  cateID: ObjectId
): Promise<ICollectionBase[]> => {
  const collections = await CollectionModel.find({
    category: cateID,
  }).lean();
  return collections;
};
