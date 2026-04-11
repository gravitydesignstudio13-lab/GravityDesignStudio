import Review from "../model/reviewSchema.js";

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

    const image = `${process.env.BACKEND_URL}/upload/${req.file.filename}`;

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

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

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