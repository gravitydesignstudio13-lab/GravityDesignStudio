import express from "express";
import { addReview, deleteReview, getReviews } from "../controller/reviewController.js";
import Upload from "../middleware/uploadImage.js";

const reviewRoute = express.Router();

reviewRoute.post("/add", Upload.single("image"), addReview);
reviewRoute.get("/all", getReviews);
reviewRoute.delete("/delete/:id", deleteReview);

export default reviewRoute;