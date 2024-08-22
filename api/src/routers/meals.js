import express from "express";
import knex from "../database_client.js";

const meals = express.Router();

meals.get("/", async (req, res) => {
  try {
    let query = knex("Meal").select("Meal.*");
    // Max Price query
    if ("maxPrice" in req.query) {
      const maxPrice = Number(req.query.maxPrice);
      if (!isNaN(maxPrice)) {
        query = query.where("price", "<=", maxPrice);
      }
    }

    // Available reservations query
    if ("availableReservations" in req.query) {
      const availableReservations = req.query.availableReservations === "true";
      if (availableReservations) {
        query = query
          .leftJoin("Reservation", "Meal.id", "=", "Reservation.meal_id")
          .groupBy("Meal.id")
          .having(
            knex.raw("COALESCE(SUM(Reservation.number_of_guests), 0)"),
            "<",
            knex.raw("Meal.max_reservations")
          )
          .select(
            knex.raw("Meal.*, COALESCE(SUM(Reservation.number_of_guests), 0) AS total_guests")
          );
        // Non- Available reservations query
      } else {
        query = query
          .leftJoin("Reservation", "Meal.id", "=", "Reservation.meal_id")
          .groupBy("Meal.id")
          .having(
            knex.raw("COALESCE(SUM(Reservation.number_of_guests), 0)"),
            ">=",
            knex.raw("Meal.max_reservations")
          )
          .select(
            knex.raw("Meal.*, COALESCE(SUM(Reservation.number_of_guests), 0) AS total_guests")
          );
      }
    }
    // title match query
    if ("title" in req.query) {
      const title = req.query.title;

      query = query.where("title", "like", `%${title}%`);
      console.log(title);
    }

    const meals = await query;
    res.send(meals);
  } catch (error) {
    console.error("Error retrieving meals:", error);
    res.status(500).send({ error: "Error retrieving meals" });
  }
});

meals.post("/", async (req, res) => {
  const body = req.body;

  if (body) {
    await knex("Meal").insert(body);
  }
});

meals.get("/:id", async (req, res) => {
  const mealId = parseInt(req.params.id);
  const selectedMeal = await knex("Meal").where("id", mealId);
  res.send(selectedMeal);
});

meals.put("/:id", async (req, res) => {
  const body = req.body;
  const mealId = req.params.id;
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
