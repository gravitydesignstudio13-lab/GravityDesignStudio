import mongoose from "mongoose";

const homeVideoSchema = new mongoose.Schema(
  {
    videoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HomeVideo = mongoose.model("HomeVideo", homeVideoSchema);

export default HomeVideo;
