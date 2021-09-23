import {
  getCategoriesFromSlug,
  getCategory,
  getCollectionsOfCategory,
} from "./../models/services/category";
import express, { Request, Response } from "express";
import { getCategories } from "../models/services/category";
import { ObjectId } from "mongoose";

const Router = express.Router();

Router.route("/").get(async (req: Request, res: Response) => {
  if (req.query.slug) {
    const categories = await getCategoriesFromSlug(req.query.slug as string);
    return res.json(categories);
  }
  const categories = await getCategories();
  return res.json(categories);
});

Router.route("/:id").get(async (req: Request, res: Response) => {
  try {
    const cateID = req.params.id as unknown as ObjectId;
    const collections = await getCollectionsOfCategory(cateID);
    const category = await getCategory(cateID);
    return res.json({ ...category, collections: collections });
  } catch (error) {
    res.status(400);
    return res.json({ error: error });
  }
});

export default Router;
