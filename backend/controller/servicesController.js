import Service from "../model/servicesSchima.js";
import cloudinary from "../config/cloudinary.js";

// CREATE SERVICE
export const createService = async (req, res) => {
  try {
    const { title, detail } = req.body;

    if (!title || !detail) {
      return res.status(400).json({
        success: false,
        message: "Enter All Details",
      });
    }

    const data = await Service.create({
      title,
      detail,
      // ✅ Cloudinary URL
      image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      data,
    });
  } catch (error) {
    console.log("createService error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating Services",
    });
  }
};

// DELETE SERVICE (Cloudinary + DB)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // 🔥 Delete image from Cloudinary
    if (service.image) {
      const publicId = service.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      await cloudinary.uploader.destroy(`gravity-images/${publicId}`);
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting service",
    });
  }
};

// GET SERVICES
export const findService = async (req, res) => {
  try {
    const data = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error finding Services",
    });
  }
};