import express from "express";
import projectrouter from "./projectRoutes.js";
import adminRoute from "./userRoute.js";
import homeVideoRoute from "./homeVideoRoute.js";
import teamroutes from "./teamRoutes.js";
import reviewRouter from "./reviewRoutes.js";
import inquiryRoute from "./inqueryRoute.js";
import serviceRoute from "./serviceRoute.js";
import galleryRouter from "./galleryRoute.js";

const mainRoute = express.Router();

mainRoute.use("/project", projectrouter);
mainRoute.use("/gallery",galleryRouter)
mainRoute.use("/admin", adminRoute);
mainRoute.use("/team", teamroutes);
mainRoute.use("/inquiry",inquiryRoute)
mainRoute.use("/review", reviewRouter);
mainRoute.use("/service",serviceRoute)



mainRoute.use("/homevideo", homeVideoRoute);
export default mainRoute;
