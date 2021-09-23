import {
  addProduct,
  getProductFromId,
  getProductsFromSlug,
  getProducts,
} from "./../models/services/product";
import { IProductBase } from "../types/product";
import express, { Request, Response } from "express";
import { string2ObjectId } from "../utils/function";

const Router = express.Router();

Router.route("/")
  .get(async (req: Request, res: Response) => {
    try {
      if (req.query.slug) {
        const product = await getProductsFromSlug(req.query.slug as string);
        return res.json(product);
      }
      const products = await getProducts();
      return res.json(products);
    } catch (error) {
      if (error) {
        res.status(400);
        return res.json({ error: error });
      }
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const productData = req.body as unknown as IProductBase;
      await addProduct(productData);
      res.status(200);
      return res.end("success");
    } catch (err) {
      if (err) {
        res.status(400);
        return res.json({ error: err });
      }
    }
  });

Router.route("/:id").get(async (req: Request, res: Response) => {
  try {
    const productId = string2ObjectId(req.params.id);
    const product = await getProductFromId(productId);
    return res.json(product);
  } catch (err) {
    res.status(400);
    return res.json({ error: err });
  }
});

export const ProductRoute = Router;
