import express from "express";
import knex from "../database_client.js";

const lastMeal = express.Router();

lastMeal.get("/", async (req, res) => {
  const lastMeal = await knex("Meal").orderBy("ID", "desc").limit(1);
  //Checking if the meal table is empty
  if (lastMeal.length == 0) {
    res.status(404).send("There is no registered meal");
  } else {
    res.status(200).json(lastMeal);
  }
});

export default lastMeal;
