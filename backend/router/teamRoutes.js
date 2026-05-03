import express from "express";
import {
  addTeamMember,
  getAllTeamMembers,
  deleteTeamMember,
  updateTeamMember,
} from "../controller/teamController.js";

import  upload  from "../middleware/uploadImage.js";

const temarouter = express.Router();

// ADD
temarouter.post("/add", upload.single("image"), addTeamMember);

// GET
temarouter.get("/all", getAllTeamMembers);

// DELETE
temarouter.delete("/delete/:id", deleteTeamMember);

// UPDATE
temarouter.put("/update/:id", upload.single("image"), updateTeamMember);

export default temarouter;