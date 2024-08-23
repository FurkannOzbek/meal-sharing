import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nestedRouter from "./routers/nested.js";
import firstMeal from "./routers/firstMeal.js";
import allMeals from "./routers/allMeals.js";
import futureMeals from "./routers/futureMeals.js";
import lastMeal from "./routers/lastMeal.js";
import pastMeals from "./routers/pastMeals.js";
import meals from "./routers/meals.js";
import reservations from "./routers/reservations.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.use("/api", apiRouter);
apiRouter.use("/nested", nestedRouter);
apiRouter.use("/first-meal", firstMeal);
apiRouter.use("/all-meals", allMeals);
apiRouter.use("/future-meals", futureMeals);
apiRouter.use("/future-meals", pastMeals);
apiRouter.use("/last-meal", lastMeal);
apiRouter.use("/meals", meals);
apiRouter.use("/reservations", reservations);

app.get("/", async (req, res, next) => {
  res.send("Welcome");
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
