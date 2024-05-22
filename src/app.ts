import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouter } from "./app/modiul/porduct/product.routes";
import { OrderRoutes } from "./app/modiul/order/order.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to my assignment-2!. You are successfully connected with me"
  );
});

app.get("/*", (req: Request, res: Response) => {
  res.send({
    success: false,
    message: "Route not found",
  });
});

export default app;
