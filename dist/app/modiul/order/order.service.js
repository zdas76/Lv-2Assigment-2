"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const product_model_1 = require("../porduct/product.model");
const order_model_1 = require("./order.model");
// Creact a order and update product quantity
const createOrdertoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const fineProdect = yield product_model_1.ProductModel.findById({ _id: data.productId });
    if (!fineProdect) {
        return { success: false, message: "Product Id Not valied" };
    }
    if (data.quantity <= fineProdect.inventory.quantity) {
        const newQuantity = fineProdect.inventory.quantity - data.quantity;
        const updateQuantity = yield product_model_1.ProductModel.findByIdAndUpdate({ _id: data.productId }, { $set: { inventory: { quantity: newQuantity } } }, { new: true });
        if ((updateQuantity === null || updateQuantity === void 0 ? void 0 : updateQuantity.inventory.quantity) == 0) {
            yield product_model_1.ProductModel.findByIdAndUpdate({ _id: data.productId }, { $set: { inventory: { quantity: 0, inStock: false } } }, { new: true });
        }
        const result = yield order_model_1.OrderModel.create(data);
        return {
            data: result,
            success: true,
            message: "Insufficient quantity available in inventory",
        };
    }
    else {
        return {
            success: false,
            message: "Insufficient quantity available in inventory",
        };
    }
});
// Get all order form bd with serch params;
const getAllOrderfromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield order_model_1.OrderModel.find({ email: email });
        return result;
    }
    else {
        const result = yield order_model_1.OrderModel.find();
        return result;
    }
});
exports.OrderService = {
    createOrdertoDB,
    getAllOrderfromDB,
};
