import mongoose from "mongoose";


const gallerySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


const Gallery=mongoose.model("gallery",gallerySchema)

export default Gallery