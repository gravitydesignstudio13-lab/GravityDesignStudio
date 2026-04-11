import express from "express";
import {
  addTeamMember,
  getAllTeamMembers,
  deleteTeamMember,
} from "../controller/teamController.js";
import upload from "../middleware/uploadImage.js"

const teamRoute = express.Router();

teamRoute.post("/add", upload.single("image"), addTeamMember);
teamRoute.get("/all", getAllTeamMembers);
teamRoute.delete("/delete/:id", deleteTeamMember);

export default teamRoute;