import express from "express";
import {
  addReview,
  getAllReviews,
  deleteReview,
  updateReview,
} from "../controller/reviewController.js";

import upload from "../middleware/uploadImage.js";

const reviewRouter = express.Router();

// ADD
reviewRouter.post("/add", addReview);

// GET
reviewRouter.get("/all", getAllReviews);

// DELETE
reviewRouter.delete("/delete/:id", deleteReview);

// UPDATE
reviewRouter.put("/update/:id", upload.single("image"), updateReview);

export default reviewRouter;