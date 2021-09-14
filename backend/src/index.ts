// "use strict";

// const express = require("express");
// const pgp = require("pg-promise")(/* options */);
// const pg = pgp(
//   "postgres://postgres:mysecretpassword@postgres:5432/maniacforum2"
// );

// // Constants
// const PORT = 3000;
// const HOST = "0.0.0.0";

// // App
// const app = express();
// app.listen(PORT, HOST);

// app.get("/", (req, res) => {
//   pg.many("SELECT * FROM boards")
//     .then((data) => {
//       const out = JSON.stringify(data);
//       console.log(out);
//       res.json(out);
//     })
//     .catch((error) => {
//       const out = JSON.stringify(error);
//       console.log(out);
//       res.json(out);
//     });
// });

import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
