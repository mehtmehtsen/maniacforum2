"use strict";

const express = require("express");
const pgp = require("pg-promise")(/* options */);
const pg = pgp(
  "postgres://postgres:mysecretpassword@postgres:5432/maniacforum2"
);

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();
app.listen(PORT, HOST);

app.get("/", (req, res) => {
  pg.many("SELECT * FROM boards")
    .then((data) => {
      const out = JSON.stringify(data);
      console.log(out);
      res.json(out);
    })
    .catch((error) => {
      const out = JSON.stringify(error);
      console.log(out);
      res.json(out);
    });
});

// console.log(`Running on http://${HOST}:${PORT}`);
