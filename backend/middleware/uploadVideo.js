import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "gravity-videos",
      resource_type: "video", // ✅ IMPORTANT
      format: "mp4",
      public_id: Date.now() + "-video",
    };
  },
});

const uploadVideo = multer({ storage });

export default uploadVideo;