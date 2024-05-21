import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouter } from "./app/modiul/porduct/product.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRouter);

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to my assignment-2!. You are successfully connected with me"
  );
});

export default app;
