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
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

pg.one("SELECT $1 AS value", 123)
  .then(function (data) {
    console.log("DATA:", data.value);
  })
  .catch(function (error) {
    console.log("ERROR:", error);
  });
