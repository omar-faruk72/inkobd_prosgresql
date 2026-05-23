import express, { type Application, type Request, type Response } from "express";
import router from "./app/routes/index.js";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Inkobd API is running",
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

export default app;
