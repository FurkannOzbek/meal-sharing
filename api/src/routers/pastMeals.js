import express from "express";
import knex from "../database_client.js";

const pastMeals = express.Router();

pastMeals.get("/", async (req, res) => {
  const result = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
  // I had to do this otherwise I am getting other weird info from the database
  const pastMeals = result[0];
  res.send(pastMeals);
  res.end();
});

export default pastMeals;
