import express from "express";
import knex from "../database_client.js";
import dayjs from "dayjs";

const meals = express.Router();

meals.post("/add", async (req, res) => {
  try {
    const { title, description, location, when, max_reservations, price, img_url } = req.body;
    if (!dayjs(when).isValid()) {
      return res.status(400).send("Wrong Date Format, please provide valid date");
    }
    const formattedDate = dayjs(when).format("YYYY-MM-DD HH:mm:ss");
    // Insert new meal into the database
    await knex("Meal").insert({
      title,
      description,
      location,
      when: formattedDate,
      max_reservations,
      price,
      img_url,
    });

    res.status(201).send("Meal added successfully");
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).send("Error adding meal: " + error.message);
  }
});

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
    }
    // If the date is after query
    if ("dateAfter" in req.query) {
      const givenDate = req.query.dateAfter;
      query = query.where("when", ">", givenDate);
      console.log(givenDate);
    }
    // If the date is before query
    if ("dateBefore" in req.query) {
      const givenDate = req.query.dateBefore;
      query = query.where("when", "<", givenDate);
    }
    if ("limit" in req.query) {
      const limit = Number(req.query.limit);
      query = query.limit(limit);
    }
    const sortKey = req.query.sortKey;
    const sortDir = req.query.sortDir ? req.query.sortDir.toLowerCase() : "asc"; // Default to 'asc' if sortDir is not provided

    if (sortKey) {
      // Validate sortDir
      if (sortDir !== "asc" && sortDir !== "desc") {
        return res.status(400).send({ error: "Invalid sortDir. Must be 'asc' or 'desc'" });
      }

      query = query.orderBy(sortKey, sortDir);
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

meals.get("/:meal_id/reviews", async (req, res) => {
  const mealId = req.params.meal_id;

  try {
    const selectedFoodReview = await knex("Review")
      .select("Meal.title", "Review.description", "Review.stars")
      .join("Meal", "Meal.id", "=", "Review.meal_id")
      .where("Meal.id", mealId);

    res.send(selectedFoodReview);
  } catch (error) {
    console.error("Error retrieving reviews for meal:", error);
    res.status(500).send({ error: "Error retrieving reviews for meal" });
  }
});

export default meals;
