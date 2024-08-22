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

reviews.get("/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  const selectedReview = await knex("Review").where("id", reviewId);
  res.send(selectedReview);
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
