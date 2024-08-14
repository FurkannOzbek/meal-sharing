import express from "express";
import knex from "../database_client.js";

const futureMeals = express.Router();

futureMeals.get("/", async (req, res) => {
  const futureMeals = await knex("Meal").where("when", ">", knex.raw("NOW()"));
  res.send(futureMeals);
  res.end();
});

export default futureMeals;
