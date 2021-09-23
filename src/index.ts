import { getCollections } from "./models/services/collection";
import express, { Application, Request, Response } from "express";
import "./config/mongoose";
import CategoryRoute from "./routes/category";
import { ProductRoute } from "./routes/product";
import { CollectionRoute } from "./routes/collection";
import cors from "cors";
import { UserRoute } from "./routes/user";
import SocialAuthRoute from "./routes/socialAuth";

const app: Application = express();

const port = process.env.PORT || 8000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
app.use(cors());

app.use("/api/categories", CategoryRoute);
app.use("/api/products", ProductRoute);
app.use("/api/collections", CollectionRoute);
app.use("/user", UserRoute);
app.use("/api/auth/social", SocialAuthRoute);

app.listen(port, (): void => {
  console.log(`Connected successfully on http://localhost:${port}`);
});
