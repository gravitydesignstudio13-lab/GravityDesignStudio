import express from "express";
import { adminLogin, adminLogout, createAdmin } from "../controller/userController.js";

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.post("/create", createAdmin); 
adminRoute.post("/logout", adminLogout);
export default adminRoute;