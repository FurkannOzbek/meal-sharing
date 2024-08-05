import express from "express";
import knex from "../database_client.js";

const firstMeal = express.Router();

firstMeal.get("/", async (req, res) => {
  const result = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC LIMIT 1");
  const fmeal = result[0];
  //Checking if the meal table is empty
  if (fmeal.length == 0) {
    res.status(404).send("There is no registered meal");
  } else {
    res.status(200).json(fmeal);
  }
});

export default firstMeal;
