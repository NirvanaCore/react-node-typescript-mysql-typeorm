import express from "express";
require("dotenv").config();
import cors from "cors";
import { routes } from "./routes";
import { createConnection, DataSource } from "typeorm";
import cookieParser from "cookie-parser";

const PORT = 8000;

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true,
        origin: ["http://loaclhost:3000"],
      })
    );

    routes(app);

    app.listen(PORT, () => {
      console.log(`Server is Listening at port ${PORT}`);
    });
  })
  .catch((err) => console.error({ err }));
