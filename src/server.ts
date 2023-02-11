import express, {Request, Response} from "express";
import cors from "cors";

import userRoute from "./routes/usersRoute";
import orderRoute from "./routes/orderRoute";
import productRoute from "./routes/productRoute";
import dashboardRoute from "./routes/dashboardRoute";

const app: express.Application = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response): void => {
  try {
    res.send("Connected"); 
  } catch (error) {
    res.status(400).json(error);
  }
});

app.use("/users", userRoute);
app.use("/orders", orderRoute);
app.use("/products", productRoute);
app.use("/dashboard", dashboardRoute)

app.listen(port, (): void => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
