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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
const getAllProductfromDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data) {
        const result = yield product_model_1.ProductModel.find({
            $or: [
                { description: { $regex: data } },
                { name: { $regex: data } },
                { category: { $regex: data } },
            ],
        });
        if (result.length > 0) {
            return result;
        }
        else {
            return {
                success: false,
                message: "Data not found",
            };
        }
    }
    else {
        const result = yield product_model_1.ProductModel.find();
        return result;
    }
});
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById({ _id: id });
    return result;
});
// find product by id and update
const updateProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateData, productId } = data;
    const result = yield product_model_1.ProductModel.findOneAndUpdate({ _id: productId }, {
        $set: {
            name: updateData.name,
            description: updateData.description,
            price: updateData.price,
            category: updateData.category,
            tags: updateData.tags,
            variants: updateData.variants,
            inventory: updateData.inventory,
        },
    });
    return result;
});
const deletePorductforDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete({ _id: id });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductfromDB,
    getProductByIdFromDB,
    updateProduct,
    deletePorductforDB,
};
