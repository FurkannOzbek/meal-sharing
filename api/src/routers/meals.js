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

meals.get("/:id", async (req, res) => {
  const mealId = parseInt(req.params.id, 10);
  const selectedMeal = await knex("Meal").where("id", mealId);
  res.send(selectedMeal);
});

meals.put("/:id", async (req, res) => {
  const body = req.body;
  const mealId = parseInt(req.params.id, 10);
  const selectedMeal = await knex("Meal").where("id", mealId);
  if (body) {
    await knex("Meal").where("id", mealId).update(body);
  }
});

meals.delete("/:id", async (req, res) => {
  const mealId = parseInt(req.params.id, 10);
  try {
    const meal = await knex("Meal").where("id", mealId).first();

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    const rowsDeleted = await knex("Meal").where("id", mealId).del();

    if (rowsDeleted) {
      res.status(200).json({ message: "Meal deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete meal" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the meal" });
  }
});

export default meals;
