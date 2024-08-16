import express from "express";
import knex from "../database_client.js";

const reservations = express.Router();

reservations.get("/", async (req, res) => {
  const reservations = await knex("Reservation").orderBy("ID", "asc");
  res.send(reservations);
});

reservations.post("/", async (req, res) => {
  const body = req.body;

  if (body) {
    await knex("Reservation").insert(body);
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

export default reservations;
