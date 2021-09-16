import express, { Application } from "express";
import { RegisterRoutes } from "../build/routes";

import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

export const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

RegisterRoutes(app);
