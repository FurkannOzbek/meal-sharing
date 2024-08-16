import express from "express";
import knex from "../database_client.js";

const meals = express.Router();

meals.get("/", async (req, res) => {
  const meals = await knex("Meal").orderBy("ID", "asc");
  res.send(meals);
});

meals.post("/", async (req, res) => {
  const body = req.body;

  if (body) {
    await knex("Meal").insert(body);
  }
});

export default meals;
