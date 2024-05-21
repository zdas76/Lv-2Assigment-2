import express from "express";
import { ProductController } from "./product.controller";
const router = express.Router();

router.post("/", ProductController.createProduct);

router.get("/:productId", ProductController.getProductById);

router.get("/", ProductController.getAllProduct);

router.put("/:productId", ProductController.updateProduct);

router.delete("/:productId", ProductController.deletePorduct);

export const ProductRouter = router;
