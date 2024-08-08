import express from "express";
import knex from "../database_client.js";

const firstMeal = express.Router();

firstMeal.get("/", async (req, res) => {
  const firstMeal = await knex("Meal").orderBy("ID", "Asc").limit(1);

  //Checking if the meal table is empty
  if (firstMeal.length == 0) {
    res.status(404).send("There is no registered meal");
  } else {
    res.status(200).json(firstMeal);
  }
});

export default firstMeal;
