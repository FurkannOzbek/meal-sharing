import express from "express";
import knex from "../database_client.js";

const pastMeals = express.Router();

pastMeals.get("/", async (req, res) => {
  const pastMeals = await knex("Meal").where("when", "<", knex.raw("NOW()"));
  res.send(pastMeals);
  res.end();
});

export default pastMeals;
