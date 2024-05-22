"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: [true, "Email is required"] },
    productId: { type: String, required: [true, "Product is required"] },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: [1, "Minimum Quantity "] },
});
exports.OrderModel = (0, mongoose_1.model)("Order", orderSchema);
