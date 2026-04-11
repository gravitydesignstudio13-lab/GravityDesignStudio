import Project from "../model/projectsSchema.js";

// ADD PROJECT
export const addProject = async (req, res) => {
  try {
    const {
      title,
      category,
      projectType,
      location,
      year,
      client,
      area,
      service,
      description,
      challenge,
      solution,
    } = req.body;

    if (
      !title ||
      !category ||
      !location ||
      !projectType ||
      !year ||
      !client ||
      !area ||
      !service ||
      !description ||
      !challenge ||
      !solution
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (!req.files || !req.files.heroImage) {
      return res.status(400).json({
        success: false,
        message: "Hero image is required",
      });
    }

    const heroImage = `${process.env.BACKEND_URL}/upload/${req.files.heroImage[0].filename}`;

    const gallery = req.files.gallery
      ? req.files.gallery.map(
          (file) => `${process.env.BACKEND_URL}/upload/${file.filename}`
        )
      : [];

    const newProject = new Project({
      title,
      category,
      projectType,
      location,
      year,
      client,
      area,
      service,
      heroImage,
      description,
      challenge,
      solution,
      gallery,
    });

    await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });
  } catch (error) {
    console.log("ADD PROJECT ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// GET ALL PROJECTS
export const getAllProjects = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const category = req.query.category || "All";
    const projectType = req.query.projectType || "All";

    const skip = (page - 1) * limit;

    let filter = {};

    if (category !== "All") {
      filter.category = category;
    }

    if (projectType !== "All") {
      filter.projectType = projectType;
    }

    const totalProjects = await Project.countDocuments(filter);

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalProjects / limit),
      totalProjects,
      data: projects,
    });
  } catch (error) {
    console.log("GET ALL PROJECTS ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching projects",
      error: error.message,
    });
  }
};
// GET SINGLE PROJECT
export const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    console.log("GET SINGLE PROJECT ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching single project",
      error: error.message,
    });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.log("DELETE PROJECT ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting project",
      error: error.message,
    });
  }
};