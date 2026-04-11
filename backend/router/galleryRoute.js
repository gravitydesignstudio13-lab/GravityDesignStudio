import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllGallery,
} from "../controller/galleryController.js";
import Upload from "../middleware/uploadImage.js";

const galleryRouter = express.Router();

galleryRouter.post("/add",Upload.single("image"), addCategory);
galleryRouter.get("/all", getAllGallery);
galleryRouter.delete("/delete/:id", deleteCategory);

export default galleryRouter;