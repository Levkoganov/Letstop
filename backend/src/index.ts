import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import logger from "morgan";
import mongodbConnection from "./config/mongodbConnection";

import usersRoute from "./routes/usersRoute";
import vouchersRoute from "./routes/vouchersRoute";
import purchaseRoute from "./routes/purchaseRoute";

config();
mongodbConnection(process.env.MONGODB_URI);

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/vouchers", vouchersRoute);
app.use("/purchase", purchaseRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
