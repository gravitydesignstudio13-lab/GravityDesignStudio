import express from "express";
import {
  addProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";

import upload from "../middleware/uploadImage.js"; // 🔥 your multer config

const projectrouter = express.Router();


// 🔥 ADD PROJECT (hero + multiple images)
projectrouter.post(
  "/add",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  addProject
);


// 🔥 GET ALL PROJECTS
projectrouter.get("/all", getAllProjects);


// 🔥 GET SINGLE PROJECT
projectrouter.get("/:id", getSingleProject);


// 🔥 UPDATE PROJECT (optional images update)
projectrouter.put(
  "/update/:id",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProject
);


// 🔥 DELETE PROJECT
projectrouter.delete("/delete/:id", deleteProject);


export default projectrouter;