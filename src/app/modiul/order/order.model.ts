import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: [true, "Email is required"] },
  productId: { type: String, required: [true, "Product is required"] },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: [1, "Minimum Quantity "] },
});

export const OrderModel = model<TOrder>("Order", orderSchema);
