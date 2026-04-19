import Review from "../model/reviewSchema.js";
import cloudinary from "../config/cloudinary.js";

// ADD REVIEW
export const addReview = async (req, res) => {
  try {
    const { name, profession, message } = req.body;

    if (!name || !profession || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Review image is required",
      });
    }

    // ✅ Cloudinary URL
    const image = req.file.path;

    const newReview = new Review({
      name,
      profession,
      message,
      image,
    });

    await newReview.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    console.log("ADD REVIEW ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding review",
    });
  }
};

// GET REVIEWS
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log("GET REVIEWS ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
    });
  }
};

// DELETE REVIEW (Cloudinary + DB)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // 🔥 Delete from Cloudinary
    if (review.image) {
      const publicId = review.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      await cloudinary.uploader.destroy(`gravity-images/${publicId}`);
    }

    await Review.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log("DELETE REVIEW ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting review",
    });
  }
};