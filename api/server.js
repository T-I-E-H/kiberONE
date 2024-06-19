import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Fingerprint from "express-fingerprint";
import AuthRootRouter from "./routers/Auth.js";
import TokenService from "./services/Token.js";
import cookieParser from "cookie-parser";

import pool from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 4200;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://89.104.68.75:3000'] }));

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

app.use("/auth", AuthRootRouter);

app.get("/resource/children", TokenService.checkAccess, async (req, res) => {
  const parent = req.user.id;
  const result = await pool.query("SELECT c.NAME, c.id FROM Children as c, Parents as p, ChildParent as cp WHERE cp.id_parent = $1 AND cp.id_child = c.id", [parent])
  res.send(result.rows);
});
app.post("/resource/children/:id", TokenService.checkAccess, async (req, res) => {
  var date = req.body.day
  console.log(date);
  const child = req.params.id;
  var result = await pool.query("SELECT * FROM MissedLessons WHERE id_child = $1 AND (STATE = 1 OR STATE = 2 OR STATE = 3)", [child]);
  if(!result.rows.length) res.send(result.rows[0]);
  else{
    console.log(result.rows);
    const config = result.rows[0]
    result = await pool.query("SELECT TIME, STATE FROM Lessons WHERE LOCATION_id = $1  AND TOPIC = $2 AND LDAY = $3 AND (STATE = 1 OR STATE = 2 OR STATE = 3)", [config.location_id,config.topic, date])
    console.log(result.rows);
    res.send(result.rows);
  }
  
});

app.listen(PORT, () => {
  console.log("Сервер успешно запущен");
});
