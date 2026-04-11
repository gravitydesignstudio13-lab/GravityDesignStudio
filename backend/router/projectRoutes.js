import express from "express";
import {
  addProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
} from "../controller/projectController.js";
import Upload from "../middleware/uploadImage.js";

const projectRouter = express.Router();

// add project
projectRouter.post(
  "/add",
  Upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  addProject
);

// get all projects
projectRouter.get("/all", getAllProjects);

// get single project
projectRouter.get("/:id", getSingleProject);

// delete project
projectRouter.delete("/delete/:id", deleteProject);

export default projectRouter;