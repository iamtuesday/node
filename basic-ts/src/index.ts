import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import logger from "./utils/logger";


import config from "config";
import responseTime from "response-time";
import connect from "./utils/connect";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
});
