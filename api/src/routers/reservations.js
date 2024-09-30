import express from "express";
import knex from "../database_client.js";

const reservations = express.Router();

reservations.get("/", async (req, res) => {
  const reservations = await knex("Reservation").orderBy("ID", "asc");
  res.send(reservations);
});

reservations.post("/add", async (req, res) => {
  try {
    const { number_of_guests, meal_id, contact_phonenumber, contact_name, contact_email } =
      req.body;

    // Validation and extra try-catch for meal existence
    let meal;
    try {
      meal = await knex("Meal").where("id", meal_id).first();
      console.log(meal);
      if (!meal) {
        return res.status(404).json({ error: "Meal not found!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching meal info", details: error.message });
    }
    // Calculation of total reservations

    let totalReserved;
    try {
      const maxReservation = meal.max_reservations;
      const totalReservedResult = await knex("Reservation")
        .where("meal_id", meal_id)
        .sum("number_of_guests as total_reserved");
      totalReserved = Number(totalReservedResult[0].total_reserved) || 0;
      if (totalReserved + number_of_guests > maxReservation) {
        return res.status(400).json({
          error: "Exceeds maximum reservation limit for this meal",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error calculating total reservations", details: error.message });
    }
    // Insert new reservation

    try {
      await knex("Reservation").insert({
        number_of_guests,
        meal_id,
        contact_phonenumber,
        contact_name,
        contact_email,
      });
    } catch (error) {
      return res.status(500).json({ error: "Error inserting reservation", details: error.message });
    }

    res.status(201).send("Reservation added successfully");
  } catch (error) {
    console.error("Error adding reservation:", error);
    res.status(500).send("Error adding reservation: " + error.message);
  }
});

reservations.get("/:id", async (req, res) => {
  const reservationId = parseInt(req.params.id, 10);
  const selectedReservation = await knex("Reservation").where("id", reservationId);
  res.send(selectedReservation);
});

reservations.put("/:id", async (req, res) => {
  const body = req.body;
  const reservationId = parseInt(req.params.id, 10);
  const selectedReservation = await knex("Reservation").where("id", reservationId);
  if (body) {
    await knex("Reservation").where("id", reservationId).update(body);
  }
});

reservations.delete("/:id", async (req, res) => {
  const reservationId = parseInt(req.params.id, 10);
  try {
    const reservation = await knex("Reservation").where("id", reservationId).first();

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const rowsDeleted = await knex("Reservation").where("id", reservationId).del();

    if (rowsDeleted) {
      res.status(200).json({ message: "Reservation deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete Reservation" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the Reservation" });
  }
});

reservations.get(`/meal/:id`, async (req, res) => {
  try {
    const { id: meal_id } = req.params;

    // Check if meal_id is a valid number
    if (isNaN(meal_id)) {
      return res.status(400).json({ message: "Invalid meal ID" });
    }

    // Query the total number of guests reserved
    const totalReservedResult = await knex("Reservation")
      .where("meal_id", meal_id)
      .sum("number_of_guests as total_reserved");

    // Convert the sum result to a number, default to 0 if null/undefined
    const totalReserved = Number(totalReservedResult[0]?.total_reserved) || 0;

    // Respond with the total reserved number
    res.json({ totalReserved });
  } catch (error) {
    console.error("Error fetching total reservations:", error);
    // Use res.sendStatus instead of res.send to send the correct status code
    res.sendStatus(500);
  }
});

export default reservations;
