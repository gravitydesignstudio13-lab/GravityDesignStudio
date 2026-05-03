import express from "express";
import { uploadHomeVideo, getHomeVideo } from "../controller/homeVideoController.js";
import uploadVideo from "../middleware/uploadVideo.js";

const router = express.Router();

router.post("/upload", uploadVideo.single("video"), uploadHomeVideo);
router.get("/get", getHomeVideo);

export default router;