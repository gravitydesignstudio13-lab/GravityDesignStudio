import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllGallery,
  getAllGalleryRaw,
} from "../controller/galleryController.js";
import Upload from "../middleware/uploadImage.js";

const galleryRouter = express.Router();

galleryRouter.post("/add",Upload.single("image"), addCategory);
galleryRouter.get("/all", getAllGallery);
galleryRouter.delete("/delete/:id", deleteCategory);
galleryRouter.get("/all-raw", getAllGalleryRaw);
export default galleryRouter;