import Gallery from "../model/gallerySchema.js";

// ADD CATEGORY
export const addCategory = async (req, res) => {
  try {
    const { category} = req.body;

    if (!category ) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
     
   
    const newCategory = new Gallery({
      category,
      image:req.file? `${process.env.BACKEND_URL}/upload/${req.file.filename}`:null
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Image added successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding Image",
      error: error.message,
    });
  }
};

// GET ALL Gallery

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
// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Gallery.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting Image",
      error: error.message,
    });
  }
};