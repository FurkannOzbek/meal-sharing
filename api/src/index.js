import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nestedRouter from "./routers/nested.js";
import meals from "./routers/meals.js";
import reservations from "./routers/reservations.js";
import reviews from "./routers/reviews.js";
import knex from "./database_client.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.use("/api", apiRouter);
apiRouter.use("/nested", nestedRouter);
apiRouter.use("/meals", meals);
apiRouter.use("/reservations", reservations);
apiRouter.use("/reviews", reviews);

app.get("/", async (req, res, next) => {
  res.send("Welcome");
});

apiRouter.get("/first-meal", async (req, res) => {
  const firstMeal = await knex("Meal").orderBy("ID", "Asc").limit(1);
  //Checking if the meal table is empty
  if (firstMeal.length == 0) {
    res.status(404).send("There is no registered meal");
  } else {
    res.status(200).json(firstMeal);
  }
});

apiRouter.get("/last-meal", async (req, res) => {
  const lastMeal = await knex("Meal").orderBy("ID", "desc").limit(1);
  //Checking if the meal table is empty
  if (lastMeal.length == 0) {
    res.status(404).send("There is no registered meal");
  } else {
    res.status(200).json(lastMeal);
  }
});

apiRouter.get("/future-meals", async (req, res) => {
  const futureMeals = await knex("Meal").where("when", ">", knex.raw("NOW()"));
  res.send(futureMeals);
  res.end();
});

apiRouter.get("/all-meals", async (req, res) => {
  const allMeals = await knex("Meal").orderBy("ID", "asc");
  res.send(allMeals);
  res.end();
});

apiRouter.get("/past-meals", async (req, res) => {
  const pastMeals = await knex("Meal").where("when", "<", knex.raw("NOW()"));
  res.send(pastMeals);
  res.end();
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
