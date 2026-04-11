import ProjectType from "../model/projectTypeSchema.js";

// add project type
export const addProjectType = async (req, res) => {
  try {
    const { category, typeName } = req.body;

    if (!category || !typeName) {
      return res.status(400).json({
        success: false,
        message: "Category and type name are required",
      });
    }

    const alreadyExists = await ProjectType.findOne({
      category: category.trim(),
      typeName: typeName.trim(),
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Project type already exists in this category",
      });
    }

    const newProjectType = new ProjectType({
      category: category.trim(),
      typeName: typeName.trim(),
    });

    await newProjectType.save();

    return res.status(201).json({
      success: true,
      message: "Project type added successfully",
      data: newProjectType,
    });
  } catch (error) {
    console.log("ADD PROJECT TYPE ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get all project types
export const getAllProjectTypes = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const data = await ProjectType.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Project types fetched successfully",
      data,
    });
  } catch (error) {
    console.log("GET PROJECT TYPES ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// delete project type
export const deleteProjectType = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ProjectType.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Project type not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project type deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.log("DELETE PROJECT TYPE ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};