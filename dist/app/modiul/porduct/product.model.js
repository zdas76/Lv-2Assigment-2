"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productVariantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    value: {
        type: String,
        required: [true, "value is required"],
    },
});
const productInventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: [true, "Inventory is required"] },
    inStock: { type: Boolean, default: true },
});
const productSchema = new mongoose_1.Schema({
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
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
