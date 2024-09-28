import express from "express";
import knex from "../database_client.js";

const reviews = express.Router();

reviews.get("/", async (req, res) => {
  try {
    const reviews = await knex("Review").select("*");
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ error: "Error " });
  }
});

reviews.post("/add", async (req, res) => {
  try {
    const { title, description, stars, meal_id } = req.body;

    await knex("Review").insert({
      title,
      description,
      stars,
      meal_id,
    });

    res.status(201).send("Review added successfully");
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send("Error adding review: " + error.message);
  }
});

reviews.get("/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  const selectedReview = await knex("Review").where("id", reviewId);
  res.send(selectedReview);
});

reviews.get("/meal/:id", async (req, res) => {
  const mealId = parseInt(req.params.id); // Ensure meal_id is parsed correctly to an integer
  try {
    // Ensure that the table name and column names are correct as per your database schema
    const comments = await knex("Review").where("meal_id", mealId);

    // Check if comments were found
    if (comments.length === 0) {
      return res.status(404).send({ error: "No comments found for this meal." });
    }

    res.send(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error); // Log the error for debugging
    res.status(500).send({ error: "Failed to retrieve comments." });
  }
});

reviews.put("/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  const body = req.body;
  if (body) {
    await knex("Review").where("id", reviewId).update(body);
  }
});

reviews.delete("/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  const body = req.body;
  if (body) {
    await knex("Review").where("id", reviewId).del();
  }
});

reviews.post("/", async (req, res) => {
  const body = req.body;
  if (body) {
    return await knex("Review").insert(body);
  }
});

export default reviews;
