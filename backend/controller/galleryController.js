import Gallery from "../model/gallerySchema.js";
import cloudinary from "../config/cloudinary.js";

export const addCategory = async (req, res) => {
  try {
    const { category } = req.body;

    console.log("BODY =", req.body);
    console.log("FILE =", req.file);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const newCategory = new Gallery({
      category,
      iimage: req.file.path || req.file.secure_url, // ✅ Cloudinary URL
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newCategory,
    });

  } catch (error) {
    console.log("ADD GALLERY FULL ERROR =", error);
    console.log("ADD GALLERY ERROR MESSAGE =", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllGallery = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const category = req.query.category || "All";
    const skip = (page - 1) * limit;

    let filter = {};
    if (category !== "All") {
      filter.category = category;
    }

    const totalGallery = await Gallery.countDocuments(filter);
    const gallery = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Gallery fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalGallery / limit),
      totalGallery,
      data: gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching gallery",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryData = await Gallery.findById(id);

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    if (categoryData.image) {
      const publicId = categoryData.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`gravity-images/${publicId}`);
    }

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting Image",
      error: error.message,
    });
  }
};