import mongoose from "mongoose";

const projectTypeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    typeName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ProjectType = mongoose.model("ProjectType", projectTypeSchema);

export default ProjectType;