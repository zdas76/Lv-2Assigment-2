import { Schema, model } from "mongoose";
import { TProduct, TInventory, TVariants } from "./product.interface";

const productVariantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  value: {
    type: String,
    required: [true, "value is required"],
  },
});

const productInventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: [true, "Inventory is required"] },
  inStock: { type: Boolean, default: true },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  tags: [{ type: String, required: [true, "tags is required"] }],
  variants: [{ type: productVariantsSchema, required: true }],
  inventory: { type: productInventorySchema, required: true },
});

export const ProductModel = model<TProduct>("Product", productSchema);
