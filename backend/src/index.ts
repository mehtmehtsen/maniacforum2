import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import cors from "cors";

const PORT = 3000; // process.env.PORT || 3000;
const HOST = "0.0.0.0";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

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

app.listen(PORT, HOST, () => {
  console.log("Server is running on port", PORT);
});
