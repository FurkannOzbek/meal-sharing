import express from "express";
import knex from "../database_client.js";

const allMeals = express.Router();

allMeals.get("/", async (req, res) => {
  const allMeals = await knex("Meal").orderBy("ID", "asc");
  res.send(allMeals);
  res.end();
});

export default allMeals;
