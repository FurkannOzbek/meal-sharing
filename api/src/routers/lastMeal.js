import express from "express";
import knex from "../database_client.js";

const lastMeal = express.Router();

lastMeal.get("/", async (req, res) => {
  const result = await knex.raw("SELECT * FROM Meal ORDER BY ID DESC LIMIT 1");
  const lastMeal = result[0];
  //Checking if the meal table is empty
  if (lastMeal.length == 0) {
    res.status(404).send("There is no registered meal");
  } else {
    res.status(200).json(fmeal);
  }
});

export default lastMeal;
