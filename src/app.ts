
import express, { type Application, type Request, type Response } from "express";

const app : Application = express();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(express.json());

export default app;