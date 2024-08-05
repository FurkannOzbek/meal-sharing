import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg" ? "SELECT * FROM pg_catalog.pg_tables;" : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
  res.send("Welcome");
  res.end();
});

app.get("/future-meals", async (req, res) => {
  const futureMeals = await knex.raw("SELECT * FROM Meal WHERE `when` > NOW()");
  res.send(futureMeals);
  res.end();
});

app.get("/past-meals", async (req, res) => {
  const pastMeals = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
  res.send(pastMeals);
  res.end();
});

app.get("/all-meals", async (req, res) => {
  const result = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC");
  // I had to do this otherwise I am getting other weird info from the database
  const allMeals = result[0];
  res.send(allMeals);
  res.end();
});

app.get("/first-meal", async (req, res) => {
  const result = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC LIMIT 1");
  const firstMeal = result[0];
  //Checking if the meal table is empty
  if (firstMeal.length == 0) {
    res.status(404).send("There is no registered meal");
  } else {
    res.json(firstMeal);
    res.end();
  }
});

app.get("/last-meal", async (req, res) => {
  const lastMeal = await knex.raw("SELECT * FROM Meal ORDER BY ID DESC LIMIT 1");
  res.send(lastMeal);
  res.end();
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
