import Project from "../model/projectsSchema.js";
import cloudinary from "../config/cloudinary.js";


// 🔥 ADD PROJECT
export const addProject = async (req, res) => {
  try {
    const {
      title,
      location,
      description,
      fullDescription,
      status,
      category,
      year,
      area,
      duration,
      team,
      features,
      technologies,
     
    } = req.body;

    // ✅ Basic validation
    if (!title || !location || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    if (!req.files || !req.files.heroImage) {
      return res.status(400).json({
        success: false,
        message: "Hero image is required",
      });
    }

    // ✅ Cloudinary
    const heroImage = req.files.heroImage[0].path;

    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];

    const newProject = new Project({
      title,
      location,
      description,
      fullDescription,
      status,
      category,
      heroImage,
      images,
      year,
      area,
      duration,
      team,
      features,
      technologies,
    
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });
  } catch (error) {
    console.log("ADD ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// 🔥 GET ALL PROJECTS (with filter + pagination)
export const getAllProjects = async (req, res) => {
  try {
    const status = req.query.status || "All";
    const category = req.query.category || "All";

    let filter = {};

    if (status !== "All") filter.status = status;
    if (category !== "All") filter.category = category;

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: projects.length,
      data: projects,
    });
  } catch (error) {
    console.log("GET ALL ERROR:", error);
    res.status(500).json({ success: false, message: "Error fetching" });
  }
};



// 🔥 GET SINGLE PROJECT
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

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log("GET SINGLE ERROR:", error);
    res.status(500).json({ success: false, message: "Error fetching" });
  }
};



// 🔥 UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updateData = req.body;

    // 🔥 Replace hero image if new uploaded
    if (req.files?.heroImage) {
      const oldPublicId = project.heroImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`gravity-images/${oldPublicId}`);

      updateData.heroImage = req.files.heroImage[0].path;
    }

    // 🔥 Add new gallery images (optional)
    let existingImages = [];

if (req.body.existingImages) {
  existingImages = JSON.parse(req.body.existingImages);
}

// new uploaded images
let newImages = [];
if (req.files?.images) {
  newImages = req.files.images.map((file) => file.path);
}

// 🔥 FINAL images = remaining + new
updateData.images = [...existingImages, ...newImages];

    const updated = await Project.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ success: false, message: "Error updating" });
  }
};



// 🔥 DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // 🔥 Delete hero image
    if (project.heroImage) {
      const publicId = project.heroImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`gravity-images/${publicId}`);
    }

    // 🔥 Delete gallery images
    if (project.images?.length > 0) {
      for (let img of project.images) {
        const publicId = img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`gravity-images/${publicId}`);
      }
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ success: false, message: "Error deleting" });
  }
};