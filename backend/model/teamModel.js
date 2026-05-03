import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true, // make it required (recommended)

    },
    description: {
      type: String,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
  },
  { timestamps: true }
);

const Team=mongoose.model("Team", teamSchema);

export default Team
