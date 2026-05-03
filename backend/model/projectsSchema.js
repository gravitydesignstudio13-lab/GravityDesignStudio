import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    fullDescription: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Upcoming"],
      default: "Completed",
    },

    category: {
      type: String,
      required: true,
    },

    heroImage: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    year: {
      type: String,
      trim: true,
    },

    area: {
      type: String,
      trim: true,
    },

    duration: {
      type: String,
      trim: true,
    },

    team: {
      type: [String],
      default: [],
    },

    features: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;