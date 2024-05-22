"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = require("./app/modiul/porduct/product.routes");
const order_routes_1 = require("./app/modiul/order/order.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/products", product_routes_1.ProductRouter);
app.use("/api/orders", order_routes_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to my assignment-2!. You are successfully connected with me");
});
app.get("/*", (req, res) => {
    res.send({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
