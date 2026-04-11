import express from "express";
import {
  addProjectType,
  getAllProjectTypes,
  deleteProjectType,
} from "../controller/projectTypeController.js";

const projectTypeRouter = express.Router();

projectTypeRouter.post("/add", addProjectType);
projectTypeRouter.get("/all", getAllProjectTypes);
projectTypeRouter.delete("/delete/:id", deleteProjectType);

export default projectTypeRouter;