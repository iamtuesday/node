import express from "express";
import routes from "./routes";
import cors from "cors";

const port = 4000;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

app.listen(port, () => {
  console.log(` Server started at http://localhost:${port}`);

  routes(app);
});
