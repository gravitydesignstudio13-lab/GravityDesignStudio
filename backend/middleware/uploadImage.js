import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "gravity-images",
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    };
  },
});

const Upload = multer({
  storage
});

export default Upload;