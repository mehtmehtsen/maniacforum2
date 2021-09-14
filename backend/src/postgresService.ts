const pgp = require("pg-promise")(/* options */);
const pg = pgp(
  "postgres://postgres:mysecretpassword@postgres:5432/maniacforum2"
);

export { pgp, pg };
