import pg from "pg";

const pool = new pg.Pool({
  user: "kiberONE",
  password: "WWSST1",
  host: "localhost",
  port: "5432",
  database: "kiberONE",
});

export default pool;
