import express from "express";
import {
  createInquiry,
  deleteInquiry,
  getAllInquiries,
  updateInquiryStatus,
} from "../controller/inqueryController.js"

const inquiryRoute = express.Router();

inquiryRoute.post("/create", createInquiry);
inquiryRoute.get("/all", getAllInquiries);
inquiryRoute.put("/status/:id", updateInquiryStatus);
inquiryRoute.delete("/delete/:id", deleteInquiry);

export default inquiryRoute;