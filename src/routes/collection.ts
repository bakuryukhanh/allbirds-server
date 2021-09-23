import { getCollectionsFromSlug } from "./../models/services/collection";
import { ObjectId } from "mongoose";
import express, { Request, Response } from "express";
import { getCollection, getCollections } from "../models/services/collection";
import { string2ObjectId } from "../utils/function";

const Router = express.Router();

Router.route("/").get(async (req: Request, res: Response) => {
  try {
    if (req.query.slug) {
      const collections = await getCollectionsFromSlug(
        req.query.slug as string
      );
      return res.json(collections);
    }
    const collections = await getCollections();
    return res.json(collections);
  } catch (err) {
    res.status(400);
    return res.json({ error: err });
  }
});

Router.route("/:id").get(async (req: Request, res: Response) => {
  try {
    const collectionId = string2ObjectId(req.params.id);
    const collection = await getCollection(collectionId);
    return res.json(collection);
  } catch (err) {
    if (err) {
      res.status(400);
      return res.json({ error: err });
    }
  }
});

export const CollectionRoute = Router;
